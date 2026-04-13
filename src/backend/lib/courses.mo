import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type CourseMap = Map.Map<Text, Types.Course>;
  public type EnrollmentMap = Map.Map<Text, Types.Enrollment>;
  public type Counter = { var val : Nat };

  func genCourseId(counter : Counter) : Text {
    counter.val += 1;
    "co" # debug_show(counter.val);
  };

  func genEnrollId(counter : Counter) : Text {
    counter.val += 1;
    "en" # debug_show(counter.val);
  };

  public func createCourse(
    courses : CourseMap,
    counter : Counter,
    title : Text,
    description : Text,
    category : Text,
    durationWeeks : Nat,
    startDate : Types.Timestamp,
    endDate : Types.Timestamp,
    capacity : Nat,
    centerId : ?Text,
  ) : Types.Course {
    let id = genCourseId(counter);
    let course : Types.Course = {
      id;
      title;
      description;
      category;
      durationWeeks;
      startDate;
      endDate;
      capacity;
      enrolledCount = 0;
      centerId;
      createdAt = Time.now();
    };
    courses.add(id, course);
    course;
  };

  public func getCourses(courses : CourseMap) : [Types.Course] {
    courses.values().toArray();
  };

  public func getCourseById(courses : CourseMap, id : Text) : ?Types.Course {
    courses.get(id);
  };

  public func updateCourse(
    courses : CourseMap,
    id : Text,
    title : Text,
    description : Text,
    category : Text,
    durationWeeks : Nat,
    startDate : Types.Timestamp,
    endDate : Types.Timestamp,
    capacity : Nat,
  ) : Types.Result<Types.Course, Text> {
    switch (courses.get(id)) {
      case (?course) {
        let updated : Types.Course = {
          course with
          title;
          description;
          category;
          durationWeeks;
          startDate;
          endDate;
          capacity;
        };
        courses.add(id, updated);
        #ok(updated);
      };
      case null { #err("Course not found") };
    };
  };

  public func enrollStudent(
    courses : CourseMap,
    enrollments : EnrollmentMap,
    enrollCounter : Counter,
    studentId : Text,
    courseId : Text,
  ) : Types.Result<Types.Enrollment, Text> {
    switch (courses.get(courseId)) {
      case null { return #err("Course not found") };
      case (?course) {
        if (course.enrolledCount >= course.capacity) {
          return #err("Course is at full capacity");
        };
        let duplicate = enrollments.entries().find(
          func((_, e)) { e.studentId == studentId and e.courseId == courseId },
        );
        switch (duplicate) {
          case (?(_, _)) { return #err("Already enrolled in this course") };
          case null {};
        };
        let id = genEnrollId(enrollCounter);
        let enrollment : Types.Enrollment = {
          id;
          studentId;
          courseId;
          enrolledAt = Time.now();
          progressPercent = 0;
          status = "active";
        };
        enrollments.add(id, enrollment);
        let updated : Types.Course = {
          course with
          enrolledCount = course.enrolledCount + 1;
        };
        courses.add(courseId, updated);
        #ok(enrollment);
      };
    };
  };

  public func getEnrollmentsByStudent(
    enrollments : EnrollmentMap,
    studentId : Text,
  ) : [Types.Enrollment] {
    enrollments.values().filter<Types.Enrollment>(
      func(e) { e.studentId == studentId },
    ).toArray();
  };

  public func getEnrollmentsByCourse(
    enrollments : EnrollmentMap,
    courseId : Text,
  ) : [Types.Enrollment] {
    enrollments.values().filter<Types.Enrollment>(
      func(e) { e.courseId == courseId },
    ).toArray();
  };

  public func updateEnrollmentProgress(
    enrollments : EnrollmentMap,
    enrollmentId : Text,
    progress : Nat,
  ) : Types.Result<Types.Enrollment, Text> {
    switch (enrollments.get(enrollmentId)) {
      case (?enrollment) {
        let pct = if (progress > 100) { 100 } else { progress };
        let status = if (pct >= 100) { "completed" } else { "active" };
        let updated : Types.Enrollment = {
          enrollment with
          progressPercent = pct;
          status;
        };
        enrollments.add(enrollmentId, updated);
        #ok(updated);
      };
      case null { #err("Enrollment not found") };
    };
  };
};
