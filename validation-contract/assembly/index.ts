@nearBindgen
class Result {
  jobTitle: string;
  result: string;
  submitter:string;
}

@nearBindgen
export class Contract {
  //sample validation function that checks if the string 
  //has @ and its length more than 10 charcaters
  validate(jobTitle:string, work: string, submitter:string): Result {
    if (work.length >= 10) {
      if (work.indexOf("@") != -1)
        return {"jobTitle":jobTitle, "result":"succeeded", "submitter":submitter};
    }
    return {"jobTitle":jobTitle, "result":"failed","submitter":submitter};
  }
}