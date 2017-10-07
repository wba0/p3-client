import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	userInfo: any = {};
	getUserError: string;
	ownedJobs: any;
	ownedActiveJobs: any;
	workingJobs: any;
	awaitingPaymentJobs: any;
	finishedJobs: any;
  constructor(
		private authenticator: AuthApiService,
		private jobsApi: JobsApiService
	) { }

  ngOnInit() {
		this.authenticator.getLoginStatus()
			.subscribe(
				(loggedInInfo: any) => {
					if(loggedInInfo.isLoggedIn) {
						console.log("logged in info: ", loggedInInfo)
						this.userInfo = loggedInInfo.userInfo;
					}
				}
			);

			this.jobsApi.getMyOwnedJobs()
				.subscribe(
					(ownedJobs: any) => {
						this.ownedJobs = ownedJobs;
            console.log("owned jobs", this.ownedJobs)
            console.log("owned jobs applicants", this.ownedJobs.applicants)
					}
				);

			this.jobsApi.getMyOwnedActiveJobs()
				.subscribe(
					(ownedActiveJobs: any) => {
						this.ownedActiveJobs = ownedActiveJobs;
					}
				);

			this.jobsApi.getMyWorkingJobs()
				.subscribe(
					(workingJobs: any) => {
						this.workingJobs = workingJobs;
					}
				);
			this.jobsApi.getMyAwaitingPaymentJobs()
				.subscribe(
					(awaitingPaymentJobs: any) => {
						this.awaitingPaymentJobs = awaitingPaymentJobs;
					}
				);
			this.jobsApi.getMyFinishedJobs()
				.subscribe(
					(finishedJobs: any) => {
						this.finishedJobs = finishedJobs;
					}
				);
  }
}
