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
	applicationFeedback: string = null;
	errorMessage: string = null;

  constructor(
		private jobsApi: JobsApiService,
		private authenticator: AuthApiService,
		private languageService: LanguageService
	) { }



  ngOnInit() {
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
		this.filteredJobs = [];
		const filtered = this.jobs.filter(job => job.sourceLanguage === this.selectedLanguage || job.targetLanguage === this.selectedLanguage);
		this.filteredJobs = filtered;
		//remove jobs that have already been applied to
		this.filteredJobs.forEach((job, jobIndex)=>{
			job.applicants.some((el)=>{
				if(el._id === this.userInfo._id){
					this.filteredJobs.splice(jobIndex, 1);
				}
			});

		});
	}

	applyClick(jobId: string){
		// if(this.userInfo._id.toString() === )
		this.jobsApi.applyToJob(jobId)
			.subscribe(
				(data) => {
					console.log(data);
					this.applicationFeedback = "Thank you for applying! Please wait to hear back from job owner.";

				},
				(errorInfo) => {
					console.log(errorInfo);
					if(errorInfo.status === 403){
						this.errorMessage = "You cannot apply to your own jobs. Please try again."
					}
				}
			);
	}
}
