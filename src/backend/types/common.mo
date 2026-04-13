module {
  public type UserId = Text;
  public type Timestamp = Int;

  public type Result<T, E> = { #ok : T; #err : E };

  public type UserRole = {
    #Admin;
    #CenterManager;
    #Student;
    #Employer;
    #JobSeeker;
  };

  public type User = {
    id : UserId;
    email : Text;
    passwordHash : Text;
    firstName : Text;
    lastName : Text;
    phone : ?Text;
    role : UserRole;
    createdAt : Timestamp;
    lastLogin : ?Timestamp;
    isActive : Bool;
  };

  public type Center = {
    id : Text;
    name : Text;
    location : Text;
    capacity : Nat;
    managerName : Text;
    managerContact : Text;
    createdAt : Timestamp;
  };

  public type Course = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    durationWeeks : Nat;
    startDate : Timestamp;
    endDate : Timestamp;
    capacity : Nat;
    enrolledCount : Nat;
    centerId : ?Text;
    createdAt : Timestamp;
  };

  public type Enrollment = {
    id : Text;
    studentId : UserId;
    courseId : Text;
    enrolledAt : Timestamp;
    progressPercent : Nat;
    status : Text;
  };

  public type Job = {
    id : Text;
    employerId : UserId;
    title : Text;
    description : Text;
    requirements : Text;
    education : Text;
    location : Text;
    jobType : Text;
    category : Text;
    companyName : Text;
    companyEmail : Text;
    companyWebsite : ?Text;
    logoUrl : ?Text;
    createdAt : Timestamp;
    applicationsCount : Nat;
  };

  public type Application = {
    id : Text;
    jobId : Text;
    applicantId : UserId;
    resumeUrl : ?Text;
    status : Text;
    appliedAt : Timestamp;
  };

  public type PlacementDrive = {
    id : Text;
    companyName : Text;
    location : Text;
    driveDate : Timestamp;
    positions : Nat;
    description : Text;
    status : Text;
    createdAt : Timestamp;
  };

  public type PlacementRecord = {
    id : Text;
    studentId : UserId;
    driveId : Text;
    testResult : ?Text;
    offerStatus : Text;
    offerDetails : ?Text;
    createdAt : Timestamp;
  };

  public type Notification = {
    id : Text;
    userId : UserId;
    notifType : Text;
    message : Text;
    link : ?Text;
    isRead : Bool;
    createdAt : Timestamp;
  };

  public type JobSeekerProfile = {
    userId : UserId;
    country : ?Text;
    state : ?Text;
    city : ?Text;
    zipCode : ?Text;
    address : ?Text;
    resumeUrl : ?Text;
    createdAt : Timestamp;
  };

  public type Experience = {
    id : Text;
    userId : UserId;
    companyName : Text;
    positionTitle : Text;
    description : ?Text;
    startDate : Timestamp;
    endDate : ?Timestamp;
    isCurrent : Bool;
  };

  public type Education = {
    id : Text;
    userId : UserId;
    institution : Text;
    degree : Text;
    description : ?Text;
    startDate : Timestamp;
    endDate : ?Timestamp;
  };

  public type StudentProfile = {
    userId : UserId;
    dateOfBirth : ?Timestamp;
    fatherName : ?Text;
    motherName : ?Text;
    familyIncome : ?Text;
    educationLevel : ?Text;
    qualification : ?Text;
    address : ?Text;
    centerId : ?Text;
    placementStatus : Text;
  };
};
