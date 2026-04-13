import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type StudentProfileMap = Map.Map<Text, Types.StudentProfile>;
  public type JobSeekerProfileMap = Map.Map<Text, Types.JobSeekerProfile>;
  public type ExperienceMap = Map.Map<Text, Types.Experience>;
  public type EducationMap = Map.Map<Text, Types.Education>;
  public type Counter = { var val : Nat };

  func genExpId(counter : Counter) : Text {
    counter.val += 1;
    "exp" # debug_show(counter.val);
  };

  func genEduId(counter : Counter) : Text {
    counter.val += 1;
    "edu" # debug_show(counter.val);
  };

  public func upsertStudentProfile(
    profiles : StudentProfileMap,
    userId : Text,
    profile : Types.StudentProfile,
  ) : Types.StudentProfile {
    profiles.add(userId, profile);
    profile;
  };

  public func getStudentProfile(
    profiles : StudentProfileMap,
    userId : Text,
  ) : ?Types.StudentProfile {
    profiles.get(userId);
  };

  public func upsertJobSeekerProfile(
    profiles : JobSeekerProfileMap,
    userId : Text,
    profile : Types.JobSeekerProfile,
  ) : Types.JobSeekerProfile {
    profiles.add(userId, profile);
    profile;
  };

  public func getJobSeekerProfile(
    profiles : JobSeekerProfileMap,
    userId : Text,
  ) : ?Types.JobSeekerProfile {
    profiles.get(userId);
  };

  public func addExperience(
    experiences : ExperienceMap,
    counter : Counter,
    userId : Text,
    companyName : Text,
    positionTitle : Text,
    description : ?Text,
    startDate : Types.Timestamp,
    endDate : ?Types.Timestamp,
    isCurrent : Bool,
  ) : Types.Experience {
    let id = genExpId(counter);
    let exp : Types.Experience = {
      id;
      userId;
      companyName;
      positionTitle;
      description;
      startDate;
      endDate;
      isCurrent;
    };
    experiences.add(id, exp);
    exp;
  };

  public func getExperiences(
    experiences : ExperienceMap,
    userId : Text,
  ) : [Types.Experience] {
    experiences.values().filter<Types.Experience>(
      func(e) { e.userId == userId },
    ).toArray();
  };

  public func deleteExperience(
    experiences : ExperienceMap,
    id : Text,
  ) : Types.Result<(), Text> {
    switch (experiences.get(id)) {
      case (?_) {
        experiences.remove(id);
        #ok(());
      };
      case null { #err("Experience not found") };
    };
  };

  public func addEducation(
    educations : EducationMap,
    counter : Counter,
    userId : Text,
    institution : Text,
    degree : Text,
    description : ?Text,
    startDate : Types.Timestamp,
    endDate : ?Types.Timestamp,
  ) : Types.Education {
    let id = genEduId(counter);
    let edu : Types.Education = {
      id;
      userId;
      institution;
      degree;
      description;
      startDate;
      endDate;
    };
    educations.add(id, edu);
    edu;
  };

  public func getEducations(
    educations : EducationMap,
    userId : Text,
  ) : [Types.Education] {
    educations.values().filter<Types.Education>(
      func(e) { e.userId == userId },
    ).toArray();
  };

  public func deleteEducation(
    educations : EducationMap,
    id : Text,
  ) : Types.Result<(), Text> {
    switch (educations.get(id)) {
      case (?_) {
        educations.remove(id);
        #ok(());
      };
      case null { #err("Education not found") };
    };
  };
};
