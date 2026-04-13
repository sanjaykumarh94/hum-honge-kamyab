import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { translations } from "../utils/translations";

type Language = "en" | "hi";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "hhk-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored === "hi" || stored === "en" ? stored : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, language);
    } catch {
      // sessionStorage may be unavailable in some environments
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (language === "en") return key;
      return translations[key] ?? key;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
