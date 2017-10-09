import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';
import { LanguageService } from '../../services/language.service';

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
	selectedIsoCode: any;
	langArr: any = this.languageService.languages;

  constructor(
		private jobsApi: JobsApiService,
		private authenticator: AuthApiService,
		private languageService: LanguageService
	) { }



  ngOnInit() {
		// this.languageService.addIsoCode(this.jobs);
		// console.log(this.jobs)
		this.jobs.forEach((job)=>{
			job.sourceLanguage = "spanish";
			console.log(job.sourceLanguage)
		})


		this.jobsApi.getJobs()
			.subscribe(
				(jobsFromApi: any[]) => {
					this.jobs = jobsFromApi;
					//add language isocodes to jobs
					this.languageService.addIsoCode(this.jobs);

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
		this.selectedIsoCode = this.languageService.findIsoCode(this.selectedLanguage);
		console.log(this.selectedIsoCode)
		this.filteredJobs = [];
		const filtered = this.jobs.filter(job => job.sourceLanguage === this.selectedLanguage || job.targetLanguage === this.selectedLanguage);
		this.filteredJobs = filtered;
	}

	applyClick(jobId: string){
		this.jobsApi.applyToJob(jobId)
			.subscribe(
				(data) => {
					console.log(data);
				}
			);
	}
}
