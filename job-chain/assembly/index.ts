import { Context, ContractPromise, ContractPromiseBatch, PersistentVector, u128 } from "near-sdk-core"
import { Job, SubmitJobArgs, Nothing, JobState, Result } from "./models"
import {Money } from "./utils"

@nearBindgen
export class Contract {
  private jobs: PersistentVector<Job> = new PersistentVector<Job>('jobs');

  sayHello():string{
    return "hello"
  }

  @mutateState()
  createJob(title: string, jobDescription: string, offeredAmount: Money, validationContract: string, validationMethod: string): string {
    const caller = Context.predecessor

    //todo validate job parameters
    const job = new Job(caller, title, jobDescription, validationContract, validationMethod, offeredAmount);

    //Todo make sure a fee of the job is deposited neads to be paid to create a job  
    assert(Context.attachedDeposit >= offeredAmount, this.generate_fee_message());

    this.jobs.push(job);
    return "Job successfuly created";

  }

  getAllJobs(): Job[] {
    const res: Job[] = [];
    for (let i = 0; i < this.jobs.length; i++) {
      res.push(this.jobs[i]);
    }
    return res;
  }

  getAvailableJobs(): Job[] {
    const res: Job[] = [];
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].status == JobState.New)
        res.push(this.jobs[i]);
    }
    return res;
  }

  @mutateState()
  cancelJob(jobTitle: string): string {
    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].title == jobTitle) {
        this.jobs[i].status = JobState.Cancelled;
        return "success"
      }
    }
    return "not found";
  }

  @mutateState()
  clearJobs(): string {
    for (let i = 0; i < this.jobs.length; i++) {
      this.jobs.pop()
    }
    return "cleared";
  }


  private generate_fee_message(): string {
    return ("You have to deposite the amount of NEARs >= the job amount");
  }

  //mark job as completed - transfer the fees to the submiter 
  submitJob(jobTitle: string, submitedWork: string): string {
    const submitter = Context.predecessor;
    let jobValidationURL = "";
    let jobValidationMethod = "";

    for (let i = 0; i < this.jobs.length; i++) {
      if (this.jobs[i].status == JobState.New && this.jobs[i].title == jobTitle) {
        jobValidationURL = this.jobs[i].validationContract;
        jobValidationMethod = this.jobs[i].validationMethodName;
        break;
      }
    }
    if (jobValidationURL == "" || jobValidationMethod == "") {
      return "Couldn't find the job";
    }

    this.validateJob(jobValidationURL, jobValidationMethod, jobTitle, submitedWork, submitter);
    return "Execution Scheduled. Check for the submission state using checkJob() method";
  }

  validateJob(jobValidationURL: string, jobValidationMethod: string, title: string, submitedWork: string, submitter:string): void {
    ContractPromise.create<SubmitJobArgs>(
      jobValidationURL, // target contract account name
      jobValidationMethod, // target method name
      {
        jobTitle: title,
        work: submitedWork,
        submitter:submitter
      }, // target method arguments
      10000000000000  // gas attached to the call
      // projectBudget             // deposit attached to the call
    ).then<Nothing>(Context.contractName, 'jobStatusReceivedCallback', {}, 9_000_000_000_000, u128.from(1)).returnAsResult();

  }
  @mutateState()
  jobStatusReceivedCallback(): string {
    const results = ContractPromise.getResults();
    assert(results.length == 1, "This is a callback method");
    // the result of the cross contract call
    const result = results[0];

    if (result.succeeded) {
      let title = result.decode<Result>().jobTitle;
      let success = result.decode<Result>().result;
      let submitter = result.decode<Result>().submitter;

      for (let i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].title.includes(title)) {
          const job: Job = this.jobs[i];
          if (success == "succeeded") {
            job.status = JobState.Completed;
            this.jobs.replace(i, job); // Update storage with the new job.
            
            //Transfer the offered amount to the job submitter
            ContractPromiseBatch.create(submitter).transfer(this.jobs[i].offeredAmount)
                    
            return "Job Status Updated";
          } else if (success == "failed") {
            return "submission failed";
          }

        }
      }

      return "Job not found";

    } else {
      // the cross contract call failed
      return "Cross Call Failed";
    }


  }
}