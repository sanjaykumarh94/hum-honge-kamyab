import Types "../types/common";
import AuthLib "../lib/auth";
import CentersLib "../lib/centers";
import CoursesLib "../lib/courses";
import JobsLib "../lib/jobs";
import PlacementsLib "../lib/placements";
import NotifLib "../lib/notifications";

mixin (
  users : AuthLib.UserMap,
  userCounter : AuthLib.Counter,
  centers : CentersLib.CenterMap,
  centerCounter : CentersLib.Counter,
  courses : CoursesLib.CourseMap,
  enrollments : CoursesLib.EnrollmentMap,
  courseCounter : CoursesLib.Counter,
  enrollCounter : CoursesLib.Counter,
  jobs : JobsLib.JobMap,
  applications : JobsLib.ApplicationMap,
  jobCounter : JobsLib.Counter,
  appCounter : JobsLib.Counter,
  drives : PlacementsLib.DriveMap,
  placementRecords : PlacementsLib.PlacementRecordMap,
  driveCounter : PlacementsLib.Counter,
  recordCounter : PlacementsLib.Counter,
  notifications : NotifLib.NotificationMap,
  notifCounter : NotifLib.Counter,
) {
  public func seedSampleData() : async Text {
    // --- Users ---
    let _admin1 = AuthLib.register(users, userCounter, "admin@hum.cg.gov.in", "hashed_admin123", "Rajesh", "Sharma", #Admin);
    let _admin2 = AuthLib.register(users, userCounter, "admin2@hum.cg.gov.in", "hashed_admin456", "Priya", "Verma", #Admin);

    let _cm1 = AuthLib.register(users, userCounter, "manager1@hum.cg.gov.in", "hashed_mgr123", "Suresh", "Patel", #CenterManager);
    let _cm2 = AuthLib.register(users, userCounter, "manager2@hum.cg.gov.in", "hashed_mgr456", "Anita", "Singh", #CenterManager);
    let _cm3 = AuthLib.register(users, userCounter, "manager3@hum.cg.gov.in", "hashed_mgr789", "Vikram", "Gupta", #CenterManager);

    let s1 = AuthLib.register(users, userCounter, "student1@example.com", "hashed_stu123", "Amit", "Kumar", #Student);
    let s2 = AuthLib.register(users, userCounter, "student2@example.com", "hashed_stu456", "Pooja", "Yadav", #Student);
    let s3 = AuthLib.register(users, userCounter, "student3@example.com", "hashed_stu789", "Rahul", "Tiwari", #Student);
    let s4 = AuthLib.register(users, userCounter, "student4@example.com", "hashed_stu321", "Sunita", "Mishra", #Student);
    let s5 = AuthLib.register(users, userCounter, "student5@example.com", "hashed_stu654", "Deepak", "Pandey", #Student);

    let _emp1 = AuthLib.register(users, userCounter, "employer1@shreecmt.com", "hashed_emp123", "HR", "ShreeCement", #Employer);
    let _emp2 = AuthLib.register(users, userCounter, "employer2@tata.com", "hashed_emp456", "Talent", "TataGroup", #Employer);
    let _emp3 = AuthLib.register(users, userCounter, "employer3@wipro.com", "hashed_emp789", "Recruitment", "Wipro", #Employer);

    let _js1 = AuthLib.register(users, userCounter, "seeker1@gmail.com", "hashed_js123", "Mohan", "Das", #JobSeeker);
    let _js2 = AuthLib.register(users, userCounter, "seeker2@gmail.com", "hashed_js456", "Kavita", "Joshi", #JobSeeker);
    let _js3 = AuthLib.register(users, userCounter, "seeker3@gmail.com", "hashed_js789", "Arjun", "Nair", #JobSeeker);

    // --- Centers ---
    let c1 = CentersLib.createCenter(centers, centerCounter, "Raipur Skill Center", "Raipur, Chhattisgarh", 100, "Suresh Patel", "+91-9876543210");
    let c2 = CentersLib.createCenter(centers, centerCounter, "Bhilai Vocational Institute", "Bhilai, Chhattisgarh", 80, "Anita Singh", "+91-9876543211");
    let c3 = CentersLib.createCenter(centers, centerCounter, "Durg Training Hub", "Durg, Chhattisgarh", 60, "Vikram Gupta", "+91-9876543212");

    // --- Courses ---
    let baseTime : Int = 1_700_000_000_000_000_000;
    let week : Int = 7 * 24 * 3600 * 1_000_000_000;

    let co1 = CoursesLib.createCourse(courses, courseCounter, "Computer Fundamentals & MS Office", "Basic computer skills including MS Word, Excel, and PowerPoint for office jobs.", "IT", 8, baseTime, baseTime + 8 * week, 40, ?c1.id);
    let co2 = CoursesLib.createCourse(courses, courseCounter, "Retail & Sales Management", "Learn sales techniques, customer handling, and retail operations.", "Commerce", 6, baseTime + week, baseTime + 7 * week, 35, ?c2.id);
    let co3 = CoursesLib.createCourse(courses, courseCounter, "Welding & Fabrication", "Hands-on training in welding techniques for industrial employment.", "Vocational", 10, baseTime + 2 * week, baseTime + 12 * week, 30, ?c3.id);
    let co4 = CoursesLib.createCourse(courses, courseCounter, "English Communication Skills", "Spoken and written English for better employability.", "Language", 4, baseTime, baseTime + 4 * week, 50, ?c1.id);
    let co5 = CoursesLib.createCourse(courses, courseCounter, "Financial Literacy & Banking", "Understanding banking, loans, insurance, and personal finance.", "Finance", 5, baseTime + 3 * week, baseTime + 8 * week, 45, ?c2.id);

    // --- Enrollments ---
    let s1Id = switch (s1) { case (#ok(u)) { u.id }; case (#err(_)) { "" } };
    let s2Id = switch (s2) { case (#ok(u)) { u.id }; case (#err(_)) { "" } };
    let s3Id = switch (s3) { case (#ok(u)) { u.id }; case (#err(_)) { "" } };
    let s4Id = switch (s4) { case (#ok(u)) { u.id }; case (#err(_)) { "" } };
    let s5Id = switch (s5) { case (#ok(u)) { u.id }; case (#err(_)) { "" } };

    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s1Id, co1.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s1Id, co4.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s2Id, co2.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s2Id, co5.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s3Id, co3.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s4Id, co1.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s4Id, co2.id);
    let _ = CoursesLib.enrollStudent(courses, enrollments, enrollCounter, s5Id, co4.id);

    // --- Jobs ---
    let j1 = JobsLib.createJob(jobs, jobCounter, "emp-1", "Process Engineer", "Manage cement manufacturing processes, quality control, and plant operations.", "B.Tech Chemical/Mechanical, 2+ years experience", "B.Tech in Chemical or Mechanical Engineering", "Raipur, Chhattisgarh", "Full-Time", "Engineering", "Shree Cement Ltd", "hr@shreecmt.com", ?"https://www.shreecement.com");
    let j2 = JobsLib.createJob(jobs, jobCounter, "emp-2", "Sales Executive", "Expand market presence in Chhattisgarh region, handle dealer networks.", "Graduate with good communication skills, experience preferred", "Any Graduate", "Bhilai, Chhattisgarh", "Full-Time", "Sales", "Tata Group", "talent@tata.com", ?"https://www.tata.com");
    let j3 = JobsLib.createJob(jobs, jobCounter, "emp-3", "IT Support Technician", "Provide technical support, maintain hardware/software for office staff.", "Diploma/Degree in IT, basic networking knowledge", "Diploma or B.Sc IT", "Durg, Chhattisgarh", "Full-Time", "IT", "Wipro", "recruitment@wipro.com", ?"https://www.wipro.com");
    let j4 = JobsLib.createJob(jobs, jobCounter, "emp-1", "Lab Technician", "Quality testing of cement samples, report generation, lab maintenance.", "B.Sc Chemistry/Physics", "B.Sc in Chemistry or Physics", "Raipur, Chhattisgarh", "Full-Time", "Science", "Shree Cement Ltd", "hr@shreecmt.com", ?"https://www.shreecement.com");
    let j5 = JobsLib.createJob(jobs, jobCounter, "emp-2", "Customer Service Representative", "Handle customer queries, complaints, and provide product information.", "Good communication, basic computer skills", "12th Pass or Graduate", "Raipur, Chhattisgarh", "Part-Time", "Customer Service", "Tata Group", "talent@tata.com", ?"https://www.tata.com");

    // --- Applications ---
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j1.id, s1Id, null);
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j2.id, s2Id, null);
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j3.id, s3Id, null);
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j4.id, s4Id, null);
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j5.id, s5Id, null);
    let _ = JobsLib.applyForJob(jobs, applications, appCounter, j1.id, s3Id, null);

    // --- Placement Drives ---
    let drv1 = PlacementsLib.createPlacementDrive(drives, driveCounter, "Shree Cement Ltd", "Raipur, Chhattisgarh", baseTime + 10 * week, 15, "Campus placement drive for engineering graduates. Multiple roles available.");
    let drv2 = PlacementsLib.createPlacementDrive(drives, driveCounter, "Infosys BPO", "Bhilai, Chhattisgarh", baseTime + 12 * week, 25, "BPO recruitment drive — voice and non-voice process roles.");
    let drv3 = PlacementsLib.createPlacementDrive(drives, driveCounter, "Reliance Retail", "Durg, Chhattisgarh", baseTime + 14 * week, 30, "Retail sector placement — store operations and management trainee roles.");

    let _ = PlacementsLib.createPlacementRecord(placementRecords, recordCounter, s1Id, drv1.id);
    let _ = PlacementsLib.createPlacementRecord(placementRecords, recordCounter, s2Id, drv2.id);
    let _ = PlacementsLib.createPlacementRecord(placementRecords, recordCounter, s3Id, drv3.id);

    // --- Notifications ---
    let _ = NotifLib.createNotification(notifications, notifCounter, s1Id, "job", "New job posted: Process Engineer at Shree Cement", ?j1.id);
    let _ = NotifLib.createNotification(notifications, notifCounter, s2Id, "event", "Placement drive by Infosys BPO on " # drv2.id, null);
    let _ = NotifLib.createNotification(notifications, notifCounter, s3Id, "course", "Your enrollment in Welding & Fabrication is confirmed", ?co3.id);
    let _ = NotifLib.createNotification(notifications, notifCounter, s4Id, "job", "New job: Lab Technician at Shree Cement", ?j4.id);
    let _ = NotifLib.createNotification(notifications, notifCounter, s5Id, "course", "English Communication Skills course starts soon!", ?co4.id);

    "Seed data created: 14 users, 3 centers, 5 courses, 8 enrollments, 5 jobs, 6 applications, 3 placement drives, 3 placement records, 5 notifications";
  };
};
