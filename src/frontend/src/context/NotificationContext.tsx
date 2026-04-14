import { useActor } from "@caffeineai/core-infrastructure";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createActor } from "../backend";
import type { Notification } from "../backend.d";
import { useAuthStore } from "../store/auth";

// ─── Types ───────────────────────────────────────────────────────
interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  refresh: () => void;
  markRead: (notifId: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const POLL_INTERVAL_MS = 4000;

// ─── Provider ────────────────────────────────────────────────────
export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuthStore();
  const { actor, isFetching } = useActor(createActor);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isVisibleRef = useRef(!document.hidden);

  const fetchNotifications = useCallback(async () => {
    if (!actor || isFetching || !user?.id || !isAuthenticated) return;
    setIsLoading(true);
    try {
      const result = await actor.getNotificationsWithCount(user.id);
      setNotifications(result.notifications);
      setUnreadCount(Number(result.unreadCount));
    } catch {
      // Silently ignore fetch errors to avoid disrupting the UI
    } finally {
      setIsLoading(false);
    }
  }, [actor, isFetching, user?.id, isAuthenticated]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isVisibleRef.current) {
        fetchNotifications();
      }
    }, POLL_INTERVAL_MS);
  }, [fetchNotifications]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle visibility changes — pause polling when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      // Resume polling immediately when tab becomes visible again
      if (
        !document.hidden &&
        isAuthenticated &&
        user?.id &&
        actor &&
        !isFetching
      ) {
        fetchNotifications();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [actor, isFetching, isAuthenticated, user?.id, fetchNotifications]);

  // Start/stop polling based on authentication state
  useEffect(() => {
    if (isAuthenticated && user?.id && actor && !isFetching) {
      fetchNotifications();
      startPolling();
    } else {
      stopPolling();
      setNotifications([]);
      setUnreadCount(0);
    }
    return () => stopPolling();
  }, [
    isAuthenticated,
    user?.id,
    actor,
    isFetching,
    fetchNotifications,
    startPolling,
    stopPolling,
  ]);

  const markRead = useCallback(
    async (notifId: string) => {
      if (!actor) return;
      try {
        await actor.markNotificationRead(notifId);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch {
        // Silently ignore
      }
    },
    [actor],
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        refresh: fetchNotifications,
        markRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────
export function useNotificationContext(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  }
  return ctx;
}
