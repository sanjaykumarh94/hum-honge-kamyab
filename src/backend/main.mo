import Map "mo:core/Map";
import AuthLib "lib/auth";
import CentersLib "lib/centers";
import CoursesLib "lib/courses";
import JobsLib "lib/jobs";
import PlacementsLib "lib/placements";
import ProfilesLib "lib/profiles";
import NotifLib "lib/notifications";
import OtpLib "lib/otp";
import AuthMixin "mixins/auth-api";
import CentersMixin "mixins/centers-api";
import CoursesMixin "mixins/courses-api";
import JobsMixin "mixins/jobs-api";
import PlacementsMixin "mixins/placements-api";
import ProfilesMixin "mixins/profiles-api";
import NotifMixin "mixins/notifications-api";
import OtpMixin "mixins/otp-api";
import SeedMixin "mixins/seed-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Data maps
  let users : AuthLib.UserMap = Map.empty();
  let centers : CentersLib.CenterMap = Map.empty();
  let courses : CoursesLib.CourseMap = Map.empty();
  let enrollments : CoursesLib.EnrollmentMap = Map.empty();
  let jobs : JobsLib.JobMap = Map.empty();
  let applications : JobsLib.ApplicationMap = Map.empty();
  let drives : PlacementsLib.DriveMap = Map.empty();
  let placementRecords : PlacementsLib.PlacementRecordMap = Map.empty();
  let studentProfiles : ProfilesLib.StudentProfileMap = Map.empty();
  let jobSeekerProfiles : ProfilesLib.JobSeekerProfileMap = Map.empty();
  let experiences : ProfilesLib.ExperienceMap = Map.empty();
  let educations : ProfilesLib.EducationMap = Map.empty();
  let notifications : NotifLib.NotificationMap = Map.empty();
  let otpSessions : OtpLib.OtpSessionMap = Map.empty();

  // ID counters — mutable, live in the actor
  let userCounter : AuthLib.Counter = { var val = 0 };
  let centerCounter : CentersLib.Counter = { var val = 0 };
  let courseCounter : CoursesLib.Counter = { var val = 0 };
  let enrollCounter : CoursesLib.Counter = { var val = 0 };
  let jobCounter : JobsLib.Counter = { var val = 0 };
  let appCounter : JobsLib.Counter = { var val = 0 };
  let driveCounter : PlacementsLib.Counter = { var val = 0 };
  let recordCounter : PlacementsLib.Counter = { var val = 0 };
  let expCounter : ProfilesLib.Counter = { var val = 0 };
  let eduCounter : ProfilesLib.Counter = { var val = 0 };
  let notifCounter : NotifLib.Counter = { var val = 0 };
  let otpCounter : OtpLib.Counter = { var val = 0 };

  include AuthMixin(users, userCounter);
  include CentersMixin(centers, centerCounter);
  include CoursesMixin(courses, enrollments, courseCounter, enrollCounter, notifications, notifCounter);
  include JobsMixin(jobs, applications, jobCounter, appCounter, notifications, notifCounter);
  include PlacementsMixin(drives, placementRecords, driveCounter, recordCounter, users, notifications, notifCounter);
  include ProfilesMixin(studentProfiles, jobSeekerProfiles, experiences, educations, expCounter, eduCounter);
  include NotifMixin(notifications, notifCounter);
  include OtpMixin(otpSessions, otpCounter, users);
  include SeedMixin(users, userCounter, centers, centerCounter, courses, enrollments, courseCounter, enrollCounter, jobs, applications, jobCounter, appCounter, drives, placementRecords, driveCounter, recordCounter, notifications, notifCounter);
};
