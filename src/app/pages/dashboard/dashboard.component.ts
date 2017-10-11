import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';
import { LanguageService } from '../../services/language.service';
import { payPalCheckout, sendJobInfo } from './paypal-checkout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  userInfo: any = {};
  getUserError: string;
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
    setTimeout(() => { payPalCheckout(); }, 500);
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

        this.jobCounts.workingTranslatedJobs = awaitingPaymentJobs.filter(o => o.worker._id === this.userInfo._id).length;
        this.jobCounts.ownedTranslatedJobs = (awaitingPaymentJobs.filter(o => o.owner._id === this.userInfo._id)).length;

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
      (data) => {
        console.log(data);
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

	setUpPaypal(job){
		sendJobInfo(job);
	}
}
