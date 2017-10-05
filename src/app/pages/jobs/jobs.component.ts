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
	userInfo: any;
	selectedLanguage: string;
	languages: Array<Object> =[
		{language: "english", langDisplay: "English"},
		{language: "french", langDisplay: "Francais"},
		{language: "japanese", langDisplay: "日本語"}
	];

	levels:Array<Object> = [
		{num: 0, name: "AA"},
		{num: 1, name: "BB"}
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

	selectLanguage(){

	}

}
