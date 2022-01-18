# job-chain


## Note!
This project is meant for educational purposes only. It was developed as a part of the [NEAR](https://near.org/) certififed developer program. It is not production-ready and it misses a lot of test, validations and business logic. The project is built using  [NEAR](https://near.org/) 's AssemblyScript SDK and the deployment scripts uses  [NEAR-CLI](https://docs.near.org/docs/tools/near-cli) 

## About
The project simulates a freelance jobs portal in the era of blockchain when jobs can be auto-validated using smart contracts and the payment is proccessed automatically. 

The employer creates a job. Part of the job's required parameters is to submit the validation contract, and method, used to validate the submited work of that job.
It is up for the employer to request the type of work to be done; but it has to be sent as text to the submitJob function.

## The Employer
- Creates a validation contract and a validation method 
- Creates a job with job requirements and validation contract info using `createJob` function

## Freelancer
- Check the available jobs `getAvailableJobs`
- Submit the job using `submitJob`
- Check the job submission status `getAllJobs` or `checkJob`

* Freelance will get the the money automatically if the job got auto validated by the validation contract. 


# Runing the sample validation contract
*You have to login in the cli and set the enviornment variables "$CONTRACT" and "$OWNER" before running the scripts

`export OWNER=msaudi2.testnet`

`export CONTRACT=validate.msaudi2.testnet`

### Scripts 
`./scripts/0-check-account.sh`
This script will delete the old account if exitsis, and create a new one with the specified CONTRACT environment variable. 


 
`./scripts/1-build-deploy.sh`
This script will build, and deploy the contract.

 
`./scripts/2-test-call-validate.sh`
This script will test the deployed validation contract by calling the method valid with invalid and valid work entry.


# Runing the job portal contract

*You have to login in the cli and set the enviornment variables "$CONTRACT" and "$OWNER" before running the scripts

`export OWNER=msaudi.testnet`

`export CONTRACT=jobchain.msaudi.testnet`


### Scripts 

`./scripts/0-check-account.sh`
This script will delete the old account if exitsis, and create a new one with the speciifed CONTRACT environment variable. 


 
`./scripts/1-build-deploy.sh`
This script will build, and deploy the contract.

 
 `./scripts/3-create-job.sh`
This script will create a sample job.

 
 `./scripts/4-list-jobs.sh` or  `./scripts/4-list-available-jobs.sh`
To list all the current/available jobs

 `./scripts/5-submit-job.sh` 
To submit and validate a job as a freelance

 
 `./scripts/4-list-jobs.sh` or  `./scripts/4-list-available-jobs.sh`
To list all the current/available jobs



## Future enhancements
- Separate the submissions of the jobs from the jobs themselves
- Better handling of Gas and money transfer
- Adding tests 

