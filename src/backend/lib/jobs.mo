import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

module {
  public type JobMap = Map.Map<Text, Types.Job>;
  public type ApplicationMap = Map.Map<Text, Types.Application>;
  public type Counter = { var val : Nat };

  func genJobId(counter : Counter) : Text {
    counter.val += 1;
    "j" # debug_show(counter.val);
  };

  func genAppId(counter : Counter) : Text {
    counter.val += 1;
    "app" # debug_show(counter.val);
  };

  public func createJob(
    jobs : JobMap,
    counter : Counter,
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
  ) : Types.Job {
    let id = genJobId(counter);
    let job : Types.Job = {
      id;
      employerId;
      title;
      description;
      requirements;
      education;
      location;
      jobType;
      category;
      companyName;
      companyEmail;
      companyWebsite;
      logoUrl = null;
      createdAt = Time.now();
      applicationsCount = 0;
    };
    jobs.add(id, job);
    job;
  };

  public func getJobs(jobs : JobMap) : [Types.Job] {
    jobs.values().toArray();
  };

  public func getJobById(jobs : JobMap, id : Text) : ?Types.Job {
    jobs.get(id);
  };

  public func getJobsByEmployer(jobs : JobMap, employerId : Text) : [Types.Job] {
    jobs.values().filter<Types.Job>(
      func(j) { j.employerId == employerId },
    ).toArray();
  };

  public func updateJob(
    jobs : JobMap,
    id : Text,
    title : Text,
    description : Text,
    requirements : Text,
    education : Text,
    location : Text,
    jobType : Text,
    category : Text,
  ) : Types.Result<Types.Job, Text> {
    switch (jobs.get(id)) {
      case (?job) {
        let updated : Types.Job = {
          job with
          title;
          description;
          requirements;
          education;
          location;
          jobType;
          category;
        };
        jobs.add(id, updated);
        #ok(updated);
      };
      case null { #err("Job not found") };
    };
  };

  public func deleteJob(
    jobs : JobMap,
    id : Text,
  ) : Types.Result<(), Text> {
    switch (jobs.get(id)) {
      case (?_) {
        jobs.remove(id);
        #ok(());
      };
      case null { #err("Job not found") };
    };
  };

  public func applyForJob(
    jobs : JobMap,
    applications : ApplicationMap,
    appCounter : Counter,
    jobId : Text,
    applicantId : Text,
    resumeUrl : ?Text,
  ) : Types.Result<Types.Application, Text> {
    switch (jobs.get(jobId)) {
      case null { return #err("Job not found") };
      case (?job) {
        let duplicate = applications.entries().find(
          func((_, a)) { a.jobId == jobId and a.applicantId == applicantId },
        );
        switch (duplicate) {
          case (?(_, _)) { return #err("Already applied for this job") };
          case null {};
        };
        let id = genAppId(appCounter);
        let application : Types.Application = {
          id;
          jobId;
          applicantId;
          resumeUrl;
          status = "pending";
          appliedAt = Time.now();
        };
        applications.add(id, application);
        let updated : Types.Job = {
          job with
          applicationsCount = job.applicationsCount + 1;
        };
        jobs.add(jobId, updated);
        #ok(application);
      };
    };
  };

  public func getApplicationsByJob(
    applications : ApplicationMap,
    jobId : Text,
  ) : [Types.Application] {
    applications.values().filter<Types.Application>(
      func(a) { a.jobId == jobId },
    ).toArray();
  };

  public func getApplicationsByApplicant(
    applications : ApplicationMap,
    applicantId : Text,
  ) : [Types.Application] {
    applications.values().filter<Types.Application>(
      func(a) { a.applicantId == applicantId },
    ).toArray();
  };

  public func updateApplicationStatus(
    applications : ApplicationMap,
    applicationId : Text,
    status : Text,
  ) : Types.Result<Types.Application, Text> {
    switch (applications.get(applicationId)) {
      case (?app) {
        let updated : Types.Application = { app with status };
        applications.add(applicationId, updated);
        #ok(updated);
      };
      case null { #err("Application not found") };
    };
  };
};
