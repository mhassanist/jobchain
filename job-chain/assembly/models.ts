import { Context, u128, PersistentVector } from "near-sdk-as";
import { AccountId, Money } from "./utils";

export enum JobState {
  New,
  InProgress,
  Completed,
  Cancelled
}

@nearBindgen
export class Result {
  jobTitle: string;
  result: string;
  submitter:string
}

/**
 * A job created by a job poster
 */
@nearBindgen
export class Job {
  public creator: AccountId //accountId = string
  public detailedJobDescription: string
  public title: string
  public validationContract: string
  public validationMethodName: string
  public offeredAmount: Money //Money = u128
  public status:JobState; //todo consider enum types 0-available 1-completed

  constructor(
    creator: AccountId,
    title: AccountId,
    detailedJobDescription: string,
    validationContract: string,
    validationMethodName: string,
    offeredAmount: Money,
    status: JobState = JobState.New
  ) {
    this.creator = creator
    this.title = title
    this.detailedJobDescription = detailedJobDescription
    this.validationContract = validationContract
    this.validationMethodName = validationMethodName
    this.offeredAmount = offeredAmount
    this.status = status;
  }
}

@nearBindgen
export class SubmitJobArgs {
  work: string;
  jobTitle: string;
  submitter:string
}

@nearBindgen
export class Nothing {}