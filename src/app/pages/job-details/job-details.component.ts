import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
	oneJob: any = {};
	userInfo: any;

  constructor(
		private authenticator: AuthApiService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private jobsApi: JobsApiService
	) { }

  ngOnInit() {
		this.activatedRoute.params.subscribe((params) =>{
			console.log(params)
			this.jobsApi.getJobDetails(params.jobId)
			.subscribe(
				(oneJobDetails: any) => {
					console.log("job details info : ", oneJobDetails)
					this.oneJob = oneJobDetails;
				}
			);
		});

		this.authenticator.getLoginStatus()
			.subscribe(
				(loggedInInfo: any) => {
					this.userInfo = loggedInInfo.userInfo;
				}
			)

  }

}
