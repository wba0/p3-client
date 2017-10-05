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
	workingJobs: any;
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

			this.jobsApi.getMyJobs()
				.subscribe(
					(ownedJobs: any) => {
						this.ownedJobs = ownedJobs;
						console.log("myJobs info: ", ownedJobs);
					}
				);
  }
}
