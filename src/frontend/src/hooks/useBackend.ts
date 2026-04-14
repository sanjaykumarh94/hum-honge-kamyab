import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  JobSeekerProfile,
  Notification,
  StudentProfile,
  UserRole,
} from "../backend.d";

// ─── Query Keys ────────────────────────────────────────────────
export const QK = {
  jobs: ["jobs"] as const,
  job: (id: string) => ["jobs", id] as const,
  jobsByEmployer: (id: string) => ["jobs", "employer", id] as const,
  courses: ["courses"] as const,
  course: (id: string) => ["courses", id] as const,
  centers: ["centers"] as const,
  center: (id: string) => ["centers", id] as const,
  enrollments: (studentId: string) => ["enrollments", studentId] as const,
  enrollmentsByCourse: (courseId: string) =>
    ["enrollments", "course", courseId] as const,
  applications: (applicantId: string) => ["applications", applicantId] as const,
  applicationsByJob: (jobId: string) => ["applications", "job", jobId] as const,
  placementDrives: ["placementDrives"] as const,
  placementRecords: (studentId: string) =>
    ["placementRecords", studentId] as const,
  notifications: (userId: string) => ["notifications", userId] as const,
  notificationsWithCount: (userId: string) =>
    ["notifications", "withCount", userId] as const,
  unreadCount: (userId: string) => ["notifications", "unread", userId] as const,
  otpStatus: (sessionId: bigint) =>
    ["otp", "status", String(sessionId)] as const,
  studentProfile: (userId: string) => ["studentProfile", userId] as const,
  jobSeekerProfile: (userId: string) => ["jobSeekerProfile", userId] as const,
  experiences: (userId: string) => ["experiences", userId] as const,
  educations: (userId: string) => ["educations", userId] as const,
  allStudents: ["allStudents"] as const,
};

// ─── OTP types (aligned with backend.d.ts) ───────────────────
export interface SendOtpResult {
  ok: boolean;
  sessionId: bigint;
  error?: string;
}

export interface VerifyOtpResult {
  ok: boolean;
  userId?: bigint;
  error?: string;
}

export interface OtpStatusResult {
  valid: boolean;
  expired: boolean;
  attemptsLeft: bigint;
}

interface NotificationsWithCountResult {
  notifications: Notification[];
  unreadCount: number;
}

// ─── Jobs ───────────────────────────────────────────────────────
export function useGetJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobs,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetJobById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.job(id),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getJob(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetJobsByEmployer(employerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobsByEmployer(employerId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobsByEmployer(employerId);
    },
    enabled: !!actor && !isFetching && !!employerId,
  });
}

// ─── Courses ────────────────────────────────────────────────────
export function useGetCourses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.courses,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourseById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.course(id),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCourse(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ─── Centers ────────────────────────────────────────────────────
export function useGetCenters() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.centers,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCenters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCenterById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.center(id),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCenter(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ─── Students (Admin) ────────────────────────────────────────────
export function useGetAllStudents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.allStudents,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Enrollments ────────────────────────────────────────────────
export function useGetEnrollmentsByStudent(studentId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.enrollments(studentId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEnrollments(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useGetEnrollmentsByCourse(courseId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.enrollmentsByCourse(courseId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourseEnrollments(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

// ─── Applications ───────────────────────────────────────────────
export function useGetApplicationsByApplicant(applicantId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.applications(applicantId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyApplications(applicantId);
    },
    enabled: !!actor && !isFetching && !!applicantId,
  });
}

export function useGetApplicationsByJob(jobId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.applicationsByJob(jobId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApplicationsForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
  });
}

// ─── Placement ──────────────────────────────────────────────────
export function useGetPlacementDrives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.placementDrives,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPlacementDrives();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlacementRecordsByStudent(studentId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.placementRecords(studentId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPlacementRecord(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

// ─── Notifications ──────────────────────────────────────────────
export function useGetNotifications(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.notifications(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

/**
 * Polls notifications with unread count every 4 seconds.
 * Uses the native backend getNotificationsWithCount when available.
 */
export function useGetNotificationsWithCount(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NotificationsWithCountResult>({
    queryKey: QK.notificationsWithCount(userId),
    queryFn: async (): Promise<NotificationsWithCountResult> => {
      if (!actor) return { notifications: [], unreadCount: 0 };
      const result = await actor.getNotificationsWithCount(userId);
      return {
        notifications: result.notifications,
        unreadCount: Number(result.unreadCount),
      };
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 4000,
  });
}

export function useGetUnreadCount(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<number>({
    queryKey: QK.unreadCount(userId),
    queryFn: async (): Promise<number> => {
      if (!actor) return 0;
      const count = await actor.getUnreadCount(userId);
      return Number(count);
    },
    enabled: !!actor && !isFetching && !!userId,
    refetchInterval: 4000,
  });
}

// ─── OTP mutations ───────────────────────────────────────────────
/**
 * useSendOtp — sends OTP to the given phone via backend.
 * Backend method sendOtp is available in backend.d.ts.
 */
export function useSendOtp() {
  const { actor } = useActor(createActor);
  return useMutation<SendOtpResult, Error, { phone: string }>({
    mutationFn: async ({
      phone,
    }: { phone: string }): Promise<SendOtpResult> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendOtp(phone);
    },
  });
}

/**
 * useVerifyOtp — verifies the 6-digit code against a session.
 */
export function useVerifyOtp() {
  const { actor } = useActor(createActor);
  return useMutation<
    VerifyOtpResult,
    Error,
    { sessionId: bigint; code: string }
  >({
    mutationFn: async ({
      sessionId,
      code,
    }: {
      sessionId: bigint;
      code: string;
    }): Promise<VerifyOtpResult> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.verifyOtp(sessionId, code);
    },
  });
}

/**
 * useGetOtpStatus — polls OTP session validity.
 */
export function useGetOtpStatus(sessionId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OtpStatusResult>({
    queryKey: QK.otpStatus(sessionId ?? 0n),
    queryFn: async (): Promise<OtpStatusResult> => {
      if (!actor || !sessionId)
        return { valid: false, expired: true, attemptsLeft: 0n };
      return actor.getOtpStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 5000,
  });
}

// ─── Profiles ───────────────────────────────────────────────────
export function useGetStudentProfile(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.studentProfile(userId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetJobSeekerProfile(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobSeekerProfile(userId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getJobSeekerProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Experience & Education ─────────────────────────────────────
export function useGetExperiences(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.experiences(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExperiences(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useGetEducations(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.educations(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEducations(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

// ─── Mutations ──────────────────────────────────────────────────
export function useRegister() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params: {
      email: string;
      passwordHash: string;
      firstName: string;
      lastName: string;
      role: UserRole;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.register(
        params.email,
        params.passwordHash,
        params.firstName,
        params.lastName,
        params.role,
      );
    },
  });
}

export function useLogin() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params: { email: string; passwordHash: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.login(params.email, params.passwordHash);
    },
  });
}

export function useUpdateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateUser(
        params.id,
        params.firstName,
        params.lastName,
        params.phone,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user"] }),
  });
}

export function useEnrollInCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { studentId: string; courseId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.enrollInCourse(params.studentId, params.courseId);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.enrollments(vars.studentId) });
      qc.invalidateQueries({ queryKey: QK.courses });
    },
  });
}

export function useApplyForJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      jobId: string;
      applicantId: string;
      resumeUrl: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.applyForJob(
        params.jobId,
        params.applicantId,
        params.resumeUrl,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.applications(vars.applicantId) });
      qc.invalidateQueries({ queryKey: QK.applicationsByJob(vars.jobId) });
    },
  });
}

export function useCreateJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      employerId: string;
      title: string;
      description: string;
      requirements: string;
      education: string;
      location: string;
      jobType: string;
      category: string;
      companyName: string;
      companyEmail: string;
      companyWebsite: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addJob(
        params.employerId,
        params.title,
        params.description,
        params.requirements,
        params.education,
        params.location,
        params.jobType,
        params.category,
        params.companyName,
        params.companyEmail,
        params.companyWebsite,
      );
    },
    onSuccess: (job) => {
      qc.invalidateQueries({ queryKey: QK.jobs });
      qc.invalidateQueries({ queryKey: QK.jobsByEmployer(job.employerId) });
    },
  });
}

export function useCreateCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      location: string;
      capacity: bigint;
      managerName: string;
      managerContact: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCenter(
        params.name,
        params.location,
        params.capacity,
        params.managerName,
        params.managerContact,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.centers }),
  });
}

export function useUpdateCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      name: string;
      location: string;
      capacity: bigint;
      managerName: string;
      managerContact: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCenter(
        params.id,
        params.name,
        params.location,
        params.capacity,
        params.managerName,
        params.managerContact,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.centers });
      qc.invalidateQueries({ queryKey: QK.center(vars.id) });
    },
  });
}

export function useDeleteCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCenter(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.centers }),
  });
}

export function useCreateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      category: string;
      durationWeeks: bigint;
      startDate: bigint;
      endDate: bigint;
      capacity: bigint;
      centerId: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCourse(
        params.title,
        params.description,
        params.category,
        params.durationWeeks,
        params.startDate,
        params.endDate,
        params.capacity,
        params.centerId,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.courses }),
  });
}

export function useUpdateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      description: string;
      category: string;
      durationWeeks: bigint;
      startDate: bigint;
      endDate: bigint;
      capacity: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCourse(
        params.id,
        params.title,
        params.description,
        params.category,
        params.durationWeeks,
        params.startDate,
        params.endDate,
        params.capacity,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.courses });
      qc.invalidateQueries({ queryKey: QK.course(vars.id) });
    },
  });
}

export function useUpsertStudentProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { userId: string; profile: StudentProfile }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrUpdateProfile(params.userId, params.profile);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.studentProfile(vars.userId) }),
  });
}

export function useUpsertJobSeekerProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      userId: string;
      profile: JobSeekerProfile;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.upsertJobSeekerProfile(params.userId, params.profile);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.jobSeekerProfile(vars.userId) }),
  });
}

export function useMarkNotificationRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { notifId: string; userId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markNotificationRead(params.notifId);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.notifications(vars.userId) });
      qc.invalidateQueries({
        queryKey: QK.notificationsWithCount(vars.userId),
      });
      qc.invalidateQueries({ queryKey: QK.unreadCount(vars.userId) });
    },
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      applicationId: string;
      status: string;
      jobId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateApplicationStatus(params.applicationId, params.status);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.applicationsByJob(vars.jobId) }),
  });
}

export function useAddExperience() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      userId: string;
      companyName: string;
      positionTitle: string;
      description: string | null;
      startDate: bigint;
      endDate: bigint | null;
      isCurrent: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addExperience(
        params.userId,
        params.companyName,
        params.positionTitle,
        params.description,
        params.startDate,
        params.endDate,
        params.isCurrent,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.experiences(vars.userId) }),
  });
}

export function useDeleteExperience() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; userId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteExperience(params.id);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.experiences(vars.userId) }),
  });
}

export function useAddEducation() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      userId: string;
      institution: string;
      degree: string;
      description: string | null;
      startDate: bigint;
      endDate: bigint | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addEducation(
        params.userId,
        params.institution,
        params.degree,
        params.description,
        params.startDate,
        params.endDate,
      );
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.educations(vars.userId) }),
  });
}

export function useDeleteEducation() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; userId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteEducation(params.id);
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: QK.educations(vars.userId) }),
  });
}

export function useDeleteJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; employerId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteJob(params.id);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.jobs });
      qc.invalidateQueries({ queryKey: QK.jobsByEmployer(vars.employerId) });
    },
  });
}

export function useCreatePlacementDrive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      companyName: string;
      location: string;
      driveDate: bigint;
      positions: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addPlacementDrive(
        params.companyName,
        params.location,
        params.driveDate,
        params.positions,
        params.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.placementDrives }),
  });
}

export function useSeedSampleData() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.seedSampleData();
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}
