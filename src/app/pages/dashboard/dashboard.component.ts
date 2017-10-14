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
  ownedActiveJobs: any;
  workingJobs: any;
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
        this.router.navigate(['/']);

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
						console.log("relevant jobs: ", this.relevantJobs)
					},
					(errorInfo) => {
						console.log("error getting relevant jobs: ", errorInfo)
					}
				)


    this.jobsApi.getMyOwnedJobs()
      .subscribe(
      (ownedJobs: any) => {
        this.ownedJobs = ownedJobs;
        this.languageService.addIsoCode(this.ownedJobs);
        this.jobCounts.ownedJobs = this.ownedJobs.length;

      }
      );

    this.jobsApi.getMyOwnedActiveJobs()
      .subscribe(
      (ownedActiveJobs: any) => {
        this.ownedActiveJobs = ownedActiveJobs;
        this.languageService.addIsoCode(this.ownedActiveJobs);
        this.jobCounts.ownedActiveJobs = this.ownedActiveJobs.length;

      }
      );


    this.jobsApi.getMyWorkingJobs()
      .subscribe(
      (workingJobs: any) => {
        this.workingJobs = workingJobs;
        this.languageService.addIsoCode(this.workingJobs);
        this.jobCounts.workingJobs = this.workingJobs.length;
        console.log(this.jobCounts.workingJobs)
      }
      );
    this.jobsApi.getMyAwaitingPaymentJobs()
      .subscribe(
      (awaitingPaymentJobs: any) => {
        this.awaitingPaymentJobs = awaitingPaymentJobs;
        this.languageService.addIsoCode(this.awaitingPaymentJobs);

        this.jobCounts.workingTranslatedJobs = (awaitingPaymentJobs.filter(o => o.worker._id === this.userInfo._id)).length;
        this.jobCounts.ownedTranslatedJobs = (awaitingPaymentJobs.filter(o => o.owner._id === this.userInfo._id)).length;

				console.log("working awaiting payment length: ", awaitingPaymentJobs.filter(o => o.worker._id === this.userInfo._id).length)
				console.log("owned awaiting payment length: ", awaitingPaymentJobs.filter(o => o.owner._id === this.userInfo._id).length)

      },
      (errorInfo) => {
        console.log("Error getting awaiting payment jobs: ", errorInfo)
      }
      );
    this.jobsApi.getMyFinishedJobs()
      .subscribe(
      (finishedJobs: any) => {
        this.finishedJobs = finishedJobs;
        this.languageService.addIsoCode(this.finishedJobs);
        this.jobCounts.workingFinishedJobs = finishedJobs.filter(o => o.worker._id === this.userInfo._id).length;
        this.jobCounts.ownedFinishedJobs = (finishedJobs.filter(o => o.owner._id === this.userInfo._id)).length;
      },
      (errorInfo) => {
        console.log("Error getting finished jobs: ", errorInfo);
      }
      );
  }


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

  setUpPaypal(job) {
    sendJobInfo(job);
  }
}
