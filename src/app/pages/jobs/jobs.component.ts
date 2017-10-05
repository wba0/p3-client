import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
	jobs: any[] = [];
	filteredJobs: any[] = [];
	userInfo: any;
	selectedLanguage: string;
	languages: Array<Object> =[
		{language: "english", langDisplay: "English", isoCode: "en"},
		{language: "french", langDisplay: "Francais"},
		{language: "japanese", langDisplay: "日本語"}
	];


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

	updateJobList(){
		this.filteredJobs = [];
		const filtered = this.jobs.filter(job => job.sourceLanguage === this.selectedLanguage || job.targetLanguage === this.selectedLanguage);
		this.filteredJobs = filtered;
		console.log(this.filteredJobs)
	}

}
