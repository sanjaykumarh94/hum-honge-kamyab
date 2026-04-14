import Types "../types/common";
import JobsLib "../lib/jobs";
import NotifLib "../lib/notifications";

mixin (
  jobs : JobsLib.JobMap,
  applications : JobsLib.ApplicationMap,
  jobCounter : JobsLib.Counter,
  appCounter : JobsLib.Counter,
  notifications : NotifLib.NotificationMap,
  notifCounter : NotifLib.Counter,
) {
  public func addJob(
    employerId : Text,
    title : Text,
    description : Text,
    requirements : Text,
    education : Text,
    location : Text,
    jobType : Text,
    category : Text,
    companyName : Text,
    companyEmail : Text,
    companyWebsite : ?Text,
  ) : async Types.Job {
    JobsLib.createJob(jobs, jobCounter, employerId, title, description, requirements, education, location, jobType, category, companyName, companyEmail, companyWebsite);
  };

  public func listJobs() : async [Types.Job] {
    JobsLib.getJobs(jobs);
  };

  public func getJob(id : Text) : async ?Types.Job {
    JobsLib.getJobById(jobs, id);
  };

  public func getJobsByEmployer(employerId : Text) : async [Types.Job] {
    JobsLib.getJobsByEmployer(jobs, employerId);
  };

  public func updateJob(
    id : Text,
    title : Text,
    description : Text,
    requirements : Text,
    education : Text,
    location : Text,
    jobType : Text,
    category : Text,
  ) : async Types.Result<Types.Job, Text> {
    JobsLib.updateJob(jobs, id, title, description, requirements, education, location, jobType, category);
  };

  public func deleteJob(id : Text) : async Types.Result<(), Text> {
    JobsLib.deleteJob(jobs, id);
  };

  /// Apply for a job and auto-send an application_status notification to the applicant.
  public func applyForJob(
    jobId : Text,
    applicantId : Text,
    resumeUrl : ?Text,
  ) : async Types.Result<Types.Application, Text> {
    let result = JobsLib.applyForJob(jobs, applications, appCounter, jobId, applicantId, resumeUrl);
    switch (result) {
      case (#ok(application)) {
        // Find job title for the notification message
        let jobTitle = switch (JobsLib.getJobById(jobs, jobId)) {
          case (?job) { job.title };
          case null { "Unknown Position" };
        };
        let _ = NotifLib.createNotification(
          notifications,
          notifCounter,
          applicantId,
          "application_status",
          "Your application for \"" # jobTitle # "\" has been submitted successfully.",
          ?("app:" # application.id),
        );
        #ok(application);
      };
      case (#err(e)) { #err(e) };
    };
  };

  public func getApplicationsForJob(jobId : Text) : async [Types.Application] {
    JobsLib.getApplicationsByJob(applications, jobId);
  };

  public func getMyApplications(applicantId : Text) : async [Types.Application] {
    JobsLib.getApplicationsByApplicant(applications, applicantId);
  };

  public func updateApplicationStatus(
    applicationId : Text,
    status : Text,
  ) : async Types.Result<Types.Application, Text> {
    let result = JobsLib.updateApplicationStatus(applications, applicationId, status);
    switch (result) {
      case (#ok(application)) {
        // Notify applicant of status change
        let jobTitle = switch (JobsLib.getJobById(jobs, application.jobId)) {
          case (?job) { job.title };
          case null { "Unknown Position" };
        };
        let statusMsg = "Your application for \"" # jobTitle # "\" has been updated to: " # status # ".";
        let _ = NotifLib.createNotification(
          notifications,
          notifCounter,
          application.applicantId,
          "application_status",
          statusMsg,
          ?("app:" # applicationId),
        );
        #ok(application);
      };
      case (#err(e)) { #err(e) };
    };
  };
};
