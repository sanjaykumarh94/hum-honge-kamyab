import Types "../types/common";
import JobsLib "../lib/jobs";

mixin (
  jobs : JobsLib.JobMap,
  applications : JobsLib.ApplicationMap,
  jobCounter : JobsLib.Counter,
  appCounter : JobsLib.Counter,
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

  public func applyForJob(
    jobId : Text,
    applicantId : Text,
    resumeUrl : ?Text,
  ) : async Types.Result<Types.Application, Text> {
    JobsLib.applyForJob(jobs, applications, appCounter, jobId, applicantId, resumeUrl);
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
    JobsLib.updateApplicationStatus(applications, applicationId, status);
  };
};
