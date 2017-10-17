import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';
import { LanguageService } from '../../services/language.service';
import { payPalCheckout, sendJobInfo } from './paypal-checkout';
import * as _ from "lodash";
import * as $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  userInfo: any = {};
  getUserError: string;
	relevantJobs: any = [];
  ownedJobs: any = [];
  ownedActiveJobs: any = [];
  workingActiveJobs: any = [];
	ownedTranslatedJobs: any = [];
	workedTranslatedJobs: any = [];
	ownedFinishedJobs: any = [];
	workedFinishedJobs: any = [];

	jobsToShow: any = [];
	selectedTab: number = 1;

	awaitingPaymentJobs: any;
  finishedJobs: any;
  langArr: any[] = this.languageService.languages;
  jobCounts: any = [];
  constructor(
    private authenticator: AuthApiService,
    private jobsApi: JobsApiService,
    private languageService: LanguageService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      payPalCheckout((finishedJob) => {
        //whatever to update the ui
        this.finishedJobs.push(finishedJob);
        //remove finishedjob from awaitingPaymentJobs
        this.awaitingPaymentJobs = _.filter(this.awaitingPaymentJobs, (o: any) => {
          return o._id !== finishedJob._id;
        });
				//increment and decrement # of job indicators
				this.jobCounts.finishedJobs++;
				this.jobCounts.awaitingPaymentJobs--;

        //not working
        // $("#payment-modal").modal("hide");
        this.router.navigate(['/dashboard']);

      });
    }, 500);
  }
  ngOnInit() {

    this.authenticator.getLoginStatus()
      .subscribe(
      (loggedInInfo: any) => {
        if (loggedInInfo.isLoggedIn) {
          console.log("logged in info: ", loggedInInfo)
          this.userInfo = loggedInInfo.userInfo;
        }
      }
      );

			this.jobsApi.getRelevantJobs()
				.subscribe(
					(relevantJobs: any) => {
						this.relevantJobs = relevantJobs;
						this.languageService.addIsoCode(this.relevantJobs);

						this.ownedJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.owner){return;} else{
							return o.owner._id === this.userInfo._id && o.undergoingWork === false;}
						});

						this.ownedActiveJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.owner){return;} else{
							return o.owner._id === this.userInfo._id && o.undergoingWork === true;}
						});

						this.ownedTranslatedJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.owner){return;} else{
							return o.owner._id === this.userInfo._id && o.finishedNotPaid === true;}
						});

						this.ownedFinishedJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.owner){return;} else{
							return o.owner._id === this.userInfo._id && o.finishedAndPaid === true;}
						});

						this.workingActiveJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.worker){return;} else{
							return o.worker._id === this.userInfo._id && o.undergoingWork === true;}
						});

						this.workedTranslatedJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.worker){return;} else{
							return o.worker._id === this.userInfo._id && o.finishedNotPaid === true;}
						});

						this.workedFinishedJobs = _.filter(this.relevantJobs, (o: any) => {
							if(!o.worker){return;} else{
							return o.worker._id === this.userInfo._id && o.finishedAndPaid === true;}
						});

						this.popJobArrLengths();
						this.jobsToShow = this.ownedJobs;
						console.log("jobs to show", this.jobsToShow)

					},
					(errorInfo) => {
						console.log("error getting relevant jobs: ", errorInfo)
					}
				);

  }
	switchToOwnedJobs (tabNumber: number) {
		this.jobsToShow = this.ownedJobs;
	};
	switchToOwnedActiveJobs (tabNumber: number) {
		this.jobsToShow = this.ownedActiveJobs;
	};
	switchToOwnedTranslatedJobs (tabNumber: number) {
		this.jobsToShow = this.ownedTranslatedJobs;
	};
	switchToOwnedFinishedJobs (tabNumber: number) {
		this.jobsToShow = this.ownedFinishedJobs;
	};
	switchToWorkingActiveJobs (tabNumber: number) {
		this.jobsToShow = this.workingActiveJobs;
	};
	switchToWorkedTranslatedJobs (tabNumber: number) {
		this.jobsToShow = this.workedTranslatedJobs;
	};
	switchToWorkedFinishedJobs (tabNumber: number) {
		this.jobsToShow = this.workedFinishedJobs;
	};




  acceptOrRejectApplicant(jobId: string, applicantId: string, decision: string) {
    this.jobsApi.acceptOrRejectApplicant(jobId, applicantId, decision)
      .subscribe(
      (data: any) => {
        console.log(data);
        if (decision === "accept") {
          this.ownedActiveJobs.push(data);
          //remove accepted job from ownedJobs
          this.ownedJobs = _.filter(this.ownedJobs, (o: any) => {
            return o._id !== data._id;
          });
					//increment and decrement # of job indicators
					this.jobCounts.ownedActiveJobs ++;
					this.jobCounts.ownedJobs--;
        }
				if(decision === "reject"){
					const whichJob = this.ownedJobs.find(o => o._id === jobId);
				//remove from view
				whichJob.applicants = _.filter(whichJob.applicants, (o: any) => {
					return o._id !== applicantId;
				});
				}
        this.router.navigate(['/dashboard']);
      },
      (errorInfo) => {
        console.log("Error accepting/rejecting: ", errorInfo)
      }
      );
  }

  acceptOrRejectTranslation(jobId: string, decision: string) {
    this.jobsApi.acceptOrRejectTranslation(jobId, decision)
      .subscribe(
      (data) => {
        console.log(data);
        if (decision = "reject") {
          console.log("Rejected: ", data);
          this.router.navigate(['/dashboard']);
        }
      },
      (errorInfo) => {
        console.log("Error accepting or rejecting translation: ", errorInfo)
      }
      );
  }

	completeJob(jobId: string){
		this.jobsApi.finishPaidJob(jobId)
			.subscribe(
				(data: any) => {
					console.log(data);
					this.finishedJobs.push(data);
					//remove finished job from awaiting payment jobs
					this.awaitingPaymentJobs = _.filter(this.awaitingPaymentJobs, (o: any) => {
						return o._id !== data._id;
					});
					//increment and decrement # of job indicators
					this.jobCounts.finishedJobs ++;
					this.jobCounts.awaitingPaymentJobs--;
				},
				(errorInfo) => {
					console.log("Error finsihing job: ", errorInfo)
				}
			);
	}

  deleteJob(jobId: string) {
    this.jobsApi.deleteJob(jobId)
      .subscribe(
      (data) => {
        console.log(data);
      },
      (errorInfo) => {
        console.log("Error deleting ")
      }
      )
  }

	popJobArrLengths(){
		    this.jobCounts.ownedJobs = this.ownedJobs.length;
		    this.jobCounts.ownedActiveJobs = this.ownedActiveJobs.length;
		    this.jobCounts.ownedTranslatedJobs = this.ownedTranslatedJobs.length;
		    this.jobCounts.ownedFinishedJobs = this.ownedFinishedJobs.length;
		    this.jobCounts.workingActiveJobs = this.workingActiveJobs.length;
		    this.jobCounts.workedTranslatedJobs = this.workedTranslatedJobs.length;
		    this.jobCounts.workedFinishedJobs = this.workedFinishedJobs.length;
	}

  setUpPaypal(job) {
    sendJobInfo(job);
  }
}
