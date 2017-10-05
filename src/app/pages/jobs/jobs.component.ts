import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsApiComponent implements OnInit {
	jobs: any[] = [];
	userInfo: any;

  constructor(
		private jobsApi: JobsApiService,
		private authenticator: AuthApiService
	) { }

  ngOnInit() {
		this.jobsApi.getJobs()
			.subscribe(
				(jobsFromApi: any[]) => {
					this.jobs = jobsFromApi;
				}
			);

		this.authenticator.getLoginStatus()
			.subscribe(
				(loggedInInfo: any) => {
					if(loggedInInfo.isLoggedIn) {
						this.userInfo = loggedInInfo.userInfo;
					}
				}
			);
  }

}
