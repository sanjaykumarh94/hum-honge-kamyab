import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import ProfilesLib "../lib/profiles";

mixin (
  studentProfiles : ProfilesLib.StudentProfileMap,
  jobSeekerProfiles : ProfilesLib.JobSeekerProfileMap,
  experiences : ProfilesLib.ExperienceMap,
  educations : ProfilesLib.EducationMap,
  expCounter : ProfilesLib.Counter,
  eduCounter : ProfilesLib.Counter,
) {
  public func getProfile(userId : Text) : async ?Types.StudentProfile {
    ProfilesLib.getStudentProfile(studentProfiles, userId);
  };

  public func createOrUpdateProfile(
    userId : Text,
    profile : Types.StudentProfile,
  ) : async Types.StudentProfile {
    ProfilesLib.upsertStudentProfile(studentProfiles, userId, profile);
  };

  public func deleteProfile(userId : Text) : async Types.Result<(), Text> {
    switch (ProfilesLib.getStudentProfile(studentProfiles, userId)) {
      case (?_) {
        studentProfiles.remove(userId);
        #ok(());
      };
      case null { #err("Profile not found") };
    };
  };

  public func upsertJobSeekerProfile(
    userId : Text,
    profile : Types.JobSeekerProfile,
  ) : async Types.JobSeekerProfile {
    ProfilesLib.upsertJobSeekerProfile(jobSeekerProfiles, userId, profile);
  };

  public func getJobSeekerProfile(userId : Text) : async ?Types.JobSeekerProfile {
    ProfilesLib.getJobSeekerProfile(jobSeekerProfiles, userId);
  };

  public func addExperience(
    userId : Text,
    companyName : Text,
    positionTitle : Text,
    description : ?Text,
    startDate : Types.Timestamp,
    endDate : ?Types.Timestamp,
    isCurrent : Bool,
  ) : async Types.Experience {
    ProfilesLib.addExperience(experiences, expCounter, userId, companyName, positionTitle, description, startDate, endDate, isCurrent);
  };

  public func getExperiences(userId : Text) : async [Types.Experience] {
    ProfilesLib.getExperiences(experiences, userId);
  };

  public func deleteExperience(id : Text) : async Types.Result<(), Text> {
    ProfilesLib.deleteExperience(experiences, id);
  };

  public func addEducation(
    userId : Text,
    institution : Text,
    degree : Text,
    description : ?Text,
    startDate : Types.Timestamp,
    endDate : ?Types.Timestamp,
  ) : async Types.Education {
    ProfilesLib.addEducation(educations, eduCounter, userId, institution, degree, description, startDate, endDate);
  };

  public func getEducations(userId : Text) : async [Types.Education] {
    ProfilesLib.getEducations(educations, userId);
  };

  public func deleteEducation(id : Text) : async Types.Result<(), Text> {
    ProfilesLib.deleteEducation(educations, id);
  };
};
