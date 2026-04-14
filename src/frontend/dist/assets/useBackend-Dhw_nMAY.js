var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { I as Subscribable, J as shallowEqualObjects, K as hashKey, N as getDefaultState, O as notifyManager, Q as useQueryClient, r as reactExports, V as noop, W as shouldThrowError, g as useActor, Y as useQuery, i as createActor } from "./index-BFdoklgf.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const QK = {
  jobs: ["jobs"],
  job: (id) => ["jobs", id],
  jobsByEmployer: (id) => ["jobs", "employer", id],
  courses: ["courses"],
  course: (id) => ["courses", id],
  centers: ["centers"],
  center: (id) => ["centers", id],
  enrollments: (studentId) => ["enrollments", studentId],
  enrollmentsByCourse: (courseId) => ["enrollments", "course", courseId],
  applications: (applicantId) => ["applications", applicantId],
  applicationsByJob: (jobId) => ["applications", "job", jobId],
  placementDrives: ["placementDrives"],
  placementRecords: (studentId) => ["placementRecords", studentId],
  notifications: (userId) => ["notifications", userId],
  notificationsWithCount: (userId) => ["notifications", "withCount", userId],
  unreadCount: (userId) => ["notifications", "unread", userId],
  otpStatus: (sessionId) => ["otp", "status", String(sessionId)],
  studentProfile: (userId) => ["studentProfile", userId],
  jobSeekerProfile: (userId) => ["jobSeekerProfile", userId],
  experiences: (userId) => ["experiences", userId],
  educations: (userId) => ["educations", userId],
  allStudents: ["allStudents"]
};
function useGetJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobs,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetJobsByEmployer(employerId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobsByEmployer(employerId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobsByEmployer(employerId);
    },
    enabled: !!actor && !isFetching && !!employerId
  });
}
function useGetCourses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.courses,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCourses();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetCenters() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.centers,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCenters();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetAllStudents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.allStudents,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetEnrollmentsByStudent(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.enrollments(studentId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEnrollments(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useGetApplicationsByApplicant(applicantId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.applications(applicantId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyApplications(applicantId);
    },
    enabled: !!actor && !isFetching && !!applicantId
  });
}
function useGetApplicationsByJob(jobId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.applicationsByJob(jobId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApplicationsForJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId
  });
}
function useGetPlacementDrives() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.placementDrives,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPlacementDrives();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetPlacementRecordsByStudent(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.placementRecords(studentId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPlacementRecord(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useGetNotifications(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.notifications(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications(userId);
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useSendOtp() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      phone
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendOtp(phone);
    }
  });
}
function useVerifyOtp() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      sessionId,
      code
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.verifyOtp(sessionId, code);
    }
  });
}
function useGetStudentProfile(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.studentProfile(userId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useGetJobSeekerProfile(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.jobSeekerProfile(userId),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getJobSeekerProfile(userId);
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useGetExperiences(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.experiences(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExperiences(userId);
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useGetEducations(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QK.educations(userId),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEducations(userId);
    },
    enabled: !!actor && !isFetching && !!userId
  });
}
function useRegister() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.register(
        params.email,
        params.passwordHash,
        params.firstName,
        params.lastName,
        params.role
      );
    }
  });
}
function useLogin() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.login(params.email, params.passwordHash);
    }
  });
}
function useUpdateUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateUser(
        params.id,
        params.firstName,
        params.lastName,
        params.phone
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user"] })
  });
}
function useEnrollInCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.enrollInCourse(params.studentId, params.courseId);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.enrollments(vars.studentId) });
      qc.invalidateQueries({ queryKey: QK.courses });
    }
  });
}
function useApplyForJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.applyForJob(
        params.jobId,
        params.applicantId,
        params.resumeUrl
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.applications(vars.applicantId) });
      qc.invalidateQueries({ queryKey: QK.applicationsByJob(vars.jobId) });
    }
  });
}
function useCreateJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
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
        params.companyWebsite
      );
    },
    onSuccess: (job) => {
      qc.invalidateQueries({ queryKey: QK.jobs });
      qc.invalidateQueries({ queryKey: QK.jobsByEmployer(job.employerId) });
    }
  });
}
function useCreateCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCenter(
        params.name,
        params.location,
        params.capacity,
        params.managerName,
        params.managerContact
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.centers })
  });
}
function useUpdateCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCenter(
        params.id,
        params.name,
        params.location,
        params.capacity,
        params.managerName,
        params.managerContact
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.centers });
      qc.invalidateQueries({ queryKey: QK.center(vars.id) });
    }
  });
}
function useDeleteCenter() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCenter(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.centers })
  });
}
function useCreateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCourse(
        params.title,
        params.description,
        params.category,
        params.durationWeeks,
        params.startDate,
        params.endDate,
        params.capacity,
        params.centerId
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.courses })
  });
}
function useUpdateCourse() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateCourse(
        params.id,
        params.title,
        params.description,
        params.category,
        params.durationWeeks,
        params.startDate,
        params.endDate,
        params.capacity
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.courses });
      qc.invalidateQueries({ queryKey: QK.course(vars.id) });
    }
  });
}
function useUpsertStudentProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createOrUpdateProfile(params.userId, params.profile);
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.studentProfile(vars.userId) })
  });
}
function useUpsertJobSeekerProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.upsertJobSeekerProfile(params.userId, params.profile);
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.jobSeekerProfile(vars.userId) })
  });
}
function useUpdateApplicationStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateApplicationStatus(params.applicationId, params.status);
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.applicationsByJob(vars.jobId) })
  });
}
function useAddExperience() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addExperience(
        params.userId,
        params.companyName,
        params.positionTitle,
        params.description,
        params.startDate,
        params.endDate,
        params.isCurrent
      );
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.experiences(vars.userId) })
  });
}
function useDeleteExperience() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteExperience(params.id);
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.experiences(vars.userId) })
  });
}
function useAddEducation() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addEducation(
        params.userId,
        params.institution,
        params.degree,
        params.description,
        params.startDate,
        params.endDate
      );
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.educations(vars.userId) })
  });
}
function useDeleteEducation() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteEducation(params.id);
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: QK.educations(vars.userId) })
  });
}
function useDeleteJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteJob(params.id);
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: QK.jobs });
      qc.invalidateQueries({ queryKey: QK.jobsByEmployer(vars.employerId) });
    }
  });
}
function useCreatePlacementDrive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addPlacementDrive(
        params.companyName,
        params.location,
        params.driveDate,
        params.positions,
        params.description
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.placementDrives })
  });
}
export {
  useDeleteExperience as A,
  useAddEducation as B,
  useDeleteEducation as C,
  useGetJobs as D,
  useGetApplicationsByApplicant as E,
  useApplyForJob as F,
  useGetJobsByEmployer as G,
  useDeleteJob as H,
  useGetApplicationsByJob as I,
  useCreateJob as J,
  useUpdateApplicationStatus as K,
  useSendOtp as a,
  useVerifyOtp as b,
  useRegister as c,
  useGetAllStudents as d,
  useGetCourses as e,
  useGetCenters as f,
  useGetPlacementDrives as g,
  useCreateCenter as h,
  useUpdateCenter as i,
  useDeleteCenter as j,
  useCreateCourse as k,
  useUpdateCourse as l,
  useGetStudentProfile as m,
  useGetEnrollmentsByStudent as n,
  useCreatePlacementDrive as o,
  useUpdateUser as p,
  useGetNotifications as q,
  useUpsertStudentProfile as r,
  useEnrollInCourse as s,
  useGetPlacementRecordsByStudent as t,
  useLogin as u,
  useGetJobSeekerProfile as v,
  useGetExperiences as w,
  useGetEducations as x,
  useUpsertJobSeekerProfile as y,
  useAddExperience as z
};
