import Types "../types/common";
import CoursesLib "../lib/courses";
import NotifLib "../lib/notifications";

mixin (
  courses : CoursesLib.CourseMap,
  enrollments : CoursesLib.EnrollmentMap,
  courseCounter : CoursesLib.Counter,
  enrollCounter : CoursesLib.Counter,
  notifications : NotifLib.NotificationMap,
  notifCounter : NotifLib.Counter,
) {
  public func addCourse(
    title : Text,
    description : Text,
    category : Text,
    durationWeeks : Nat,
    startDate : Types.Timestamp,
    endDate : Types.Timestamp,
    capacity : Nat,
    centerId : ?Text,
  ) : async Types.Course {
    CoursesLib.createCourse(courses, courseCounter, title, description, category, durationWeeks, startDate, endDate, capacity, centerId);
  };

  public func listCourses() : async [Types.Course] {
    CoursesLib.getCourses(courses);
  };

  public func getCourse(id : Text) : async ?Types.Course {
    CoursesLib.getCourseById(courses, id);
  };

  public func updateCourse(
    id : Text,
    title : Text,
    description : Text,
    category : Text,
    durationWeeks : Nat,
    startDate : Types.Timestamp,
    endDate : Types.Timestamp,
    capacity : Nat,
  ) : async Types.Result<Types.Course, Text> {
    CoursesLib.updateCourse(courses, id, title, description, category, durationWeeks, startDate, endDate, capacity);
  };

  /// Enroll student in a course and auto-send a course_update notification on success.
  public func enrollInCourse(
    studentId : Text,
    courseId : Text,
  ) : async Types.Result<Types.Enrollment, Text> {
    let result = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, studentId, courseId);
    switch (result) {
      case (#ok(enrollment)) {
        let courseTitle = switch (CoursesLib.getCourseById(courses, courseId)) {
          case (?course) { course.title };
          case null { "Unknown Course" };
        };
        let _ = NotifLib.createNotification(
          notifications,
          notifCounter,
          studentId,
          "course_update",
          "You have been successfully enrolled in \"" # courseTitle # "\".",
          ?("course:" # courseId),
        );
        #ok(enrollment);
      };
      case (#err(e)) { #err(e) };
    };
  };

  public func getMyEnrollments(studentId : Text) : async [Types.Enrollment] {
    CoursesLib.getEnrollmentsByStudent(enrollments, studentId);
  };

  public func getCourseEnrollments(courseId : Text) : async [Types.Enrollment] {
    CoursesLib.getEnrollmentsByCourse(enrollments, courseId);
  };

  public func updateEnrollmentProgress(
    enrollmentId : Text,
    progress : Nat,
  ) : async Types.Result<Types.Enrollment, Text> {
    CoursesLib.updateEnrollmentProgress(enrollments, enrollmentId, progress);
  };
};
