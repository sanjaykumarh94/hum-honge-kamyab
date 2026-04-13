import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type Result_2 = {
    __kind__: "ok";
    ok: Enrollment;
} | {
    __kind__: "err";
    err: string;
};
export interface JobSeekerProfile {
    country?: string;
    city?: string;
    userId: UserId;
    createdAt: Timestamp;
    zipCode?: string;
    state?: string;
    address?: string;
    resumeUrl?: string;
}
export type Result_6 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface User {
    id: UserId;
    createdAt: Timestamp;
    role: UserRole;
    isActive: boolean;
    email: string;
    passwordHash: string;
    phone?: string;
    lastLogin?: Timestamp;
    lastName: string;
    firstName: string;
}
export interface Education {
    id: string;
    endDate?: Timestamp;
    userId: UserId;
    institution: string;
    description?: string;
    degree: string;
    startDate: Timestamp;
}
export interface Enrollment {
    id: string;
    status: string;
    studentId: UserId;
    progressPercent: bigint;
    enrolledAt: Timestamp;
    courseId: string;
}
export interface Application {
    id: string;
    status: string;
    appliedAt: Timestamp;
    applicantId: UserId;
    jobId: string;
    resumeUrl?: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: Application;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Job;
} | {
    __kind__: "err";
    err: string;
};
export interface Course {
    id: string;
    title: string;
    endDate: Timestamp;
    createdAt: Timestamp;
    description: string;
    centerId?: string;
    category: string;
    capacity: bigint;
    enrolledCount: bigint;
    durationWeeks: bigint;
    startDate: Timestamp;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Center;
} | {
    __kind__: "err";
    err: string;
};
export type UserId = string;
export interface StudentProfile {
    dateOfBirth?: Timestamp;
    userId: UserId;
    motherName?: string;
    centerId?: string;
    fatherName?: string;
    address?: string;
    placementStatus: string;
    educationLevel?: string;
    qualification?: string;
    familyIncome?: string;
}
export type Result = {
    __kind__: "ok";
    ok: User;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Course;
} | {
    __kind__: "err";
    err: string;
};
export interface PlacementDrive {
    id: string;
    status: string;
    createdAt: Timestamp;
    description: string;
    driveDate: Timestamp;
    companyName: string;
    positions: bigint;
    location: string;
}
export interface Notification {
    id: string;
    notifType: string;
    userId: UserId;
    link?: string;
    createdAt: Timestamp;
    isRead: boolean;
    message: string;
}
export interface Job {
    id: string;
    title: string;
    applicationsCount: bigint;
    jobType: string;
    createdAt: Timestamp;
    education: string;
    description: string;
    companyEmail: string;
    logoUrl?: string;
    employerId: UserId;
    companyName: string;
    category: string;
    companyWebsite?: string;
    requirements: string;
    location: string;
}
export interface Experience {
    id: string;
    endDate?: Timestamp;
    userId: UserId;
    description?: string;
    positionTitle: string;
    companyName: string;
    isCurrent: boolean;
    startDate: Timestamp;
}
export interface Center {
    id: string;
    name: string;
    createdAt: Timestamp;
    managerContact: string;
    capacity: bigint;
    location: string;
    managerName: string;
}
export interface PlacementRecord {
    id: string;
    studentId: UserId;
    testResult?: string;
    createdAt: Timestamp;
    driveId: string;
    offerDetails?: string;
    offerStatus: string;
}
export enum UserRole {
    CenterManager = "CenterManager",
    JobSeeker = "JobSeeker",
    Employer = "Employer",
    Student = "Student",
    Admin = "Admin"
}
export interface backendInterface {
    addCenter(name: string, location: string, capacity: bigint, managerName: string, managerContact: string): Promise<Center>;
    addCourse(title: string, description: string, category: string, durationWeeks: bigint, startDate: Timestamp, endDate: Timestamp, capacity: bigint, centerId: string | null): Promise<Course>;
    addEducation(userId: string, institution: string, degree: string, description: string | null, startDate: Timestamp, endDate: Timestamp | null): Promise<Education>;
    addExperience(userId: string, companyName: string, positionTitle: string, description: string | null, startDate: Timestamp, endDate: Timestamp | null, isCurrent: boolean): Promise<Experience>;
    addJob(employerId: string, title: string, description: string, requirements: string, education: string, location: string, jobType: string, category: string, companyName: string, companyEmail: string, companyWebsite: string | null): Promise<Job>;
    addPlacementDrive(companyName: string, location: string, driveDate: Timestamp, positions: bigint, description: string): Promise<PlacementDrive>;
    applyForJob(jobId: string, applicantId: string, resumeUrl: string | null): Promise<Result_5>;
    createOrUpdateProfile(userId: string, profile: StudentProfile): Promise<StudentProfile>;
    deleteCenter(id: string): Promise<Result_6>;
    deleteEducation(id: string): Promise<Result_6>;
    deleteExperience(id: string): Promise<Result_6>;
    deleteJob(id: string): Promise<Result_6>;
    deleteProfile(userId: string): Promise<Result_6>;
    enrollInCourse(studentId: string, courseId: string): Promise<Result_2>;
    getAllStudents(): Promise<Array<User>>;
    getApplicationsForJob(jobId: string): Promise<Array<Application>>;
    getCenter(id: string): Promise<Center | null>;
    getCourse(id: string): Promise<Course | null>;
    getCourseEnrollments(courseId: string): Promise<Array<Enrollment>>;
    getEducations(userId: string): Promise<Array<Education>>;
    getExperiences(userId: string): Promise<Array<Experience>>;
    getJob(id: string): Promise<Job | null>;
    getJobSeekerProfile(userId: string): Promise<JobSeekerProfile | null>;
    getJobsByEmployer(employerId: string): Promise<Array<Job>>;
    getMyApplications(applicantId: string): Promise<Array<Application>>;
    getMyEnrollments(studentId: string): Promise<Array<Enrollment>>;
    getMyPlacementRecord(studentId: string): Promise<Array<PlacementRecord>>;
    getNotifications(userId: string): Promise<Array<Notification>>;
    getProfile(userId: string): Promise<StudentProfile | null>;
    getUserById(id: string): Promise<Result>;
    listCenters(): Promise<Array<Center>>;
    listCourses(): Promise<Array<Course>>;
    listJobs(): Promise<Array<Job>>;
    listPlacementDrives(): Promise<Array<PlacementDrive>>;
    login(email: string, passwordHash: string): Promise<Result>;
    markNotificationRead(notifId: string): Promise<Result_6>;
    register(email: string, passwordHash: string, firstName: string, lastName: string, role: UserRole): Promise<Result>;
    seedSampleData(): Promise<string>;
    sendNotification(userId: string, notifType: string, message: string, link: string | null): Promise<Notification>;
    updateApplicationStatus(applicationId: string, status: string): Promise<Result_5>;
    updateCenter(id: string, name: string, location: string, capacity: bigint, managerName: string, managerContact: string): Promise<Result_4>;
    updateCourse(id: string, title: string, description: string, category: string, durationWeeks: bigint, startDate: Timestamp, endDate: Timestamp, capacity: bigint): Promise<Result_3>;
    updateEnrollmentProgress(enrollmentId: string, progress: bigint): Promise<Result_2>;
    updateJob(id: string, title: string, description: string, requirements: string, education: string, location: string, jobType: string, category: string): Promise<Result_1>;
    updateUser(id: string, firstName: string, lastName: string, phone: string | null): Promise<Result>;
    upsertJobSeekerProfile(userId: string, profile: JobSeekerProfile): Promise<JobSeekerProfile>;
}
