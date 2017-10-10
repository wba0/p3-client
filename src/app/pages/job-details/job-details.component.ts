import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  oneJob: any = {};
  userInfo: any;
	benefs: any = [];
	chosenBenef: any = {};
	errorMessage: string;
	workerHere: boolean = false;


  constructor(
    private authenticator: AuthApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobsApi: JobsApiService,
		private benefApi: BeneficiaryService,
		private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.jobsApi.getJobDetails(params.jobId)
        .subscribe(
        (oneJobDetails: any) => {
          this.oneJob = oneJobDetails;
					this.languageService.addIsoCode(this.oneJob);
        },
				(errorMessage) => {
					console.log("Error getting job details: ", errorMessage);
				}
        );
    });

		this.benefApi.getBenefs()
			.subscribe(
				(benesFromApi: any[]) => {
					this.benefs = benesFromApi;
				}
			);

    this.authenticator.getLoginStatus()
      .subscribe(
      (loggedInInfo: any) => {
        this.userInfo = loggedInInfo.userInfo;
				console.log("logged in info", this.userInfo._id);
				if(this.userInfo._id === this.oneJob.worker._id){
					this.workerHere = true;
				}
      },
			(errorInfo) => {
				console.log("Get Login Status Error: ", errorInfo)
			});

		;


  }

	handleBenef(benefId){
			this.chosenBenef = this.benefs.find(o => {
				return o._id === benefId;
			});

	}

  translateJob() {
		this.oneJob.beneficiaryId = this.chosenBenef._id;
		this.jobsApi.submitJob(this.oneJob._id, this.oneJob)
      .subscribe(
      (translatedJob: any) => {
        console.log("Post successful: ", translatedJob);
				this.errorMessage = "";
				this.router.navigate(["/dashboard"]);
      },
			(errorInfo) => {
				console.log("Post unsuccessful: ", errorInfo);
				if(errorInfo.status === 400){this.errorMessage = "Validation Error"} else{ this.errorMessage = "Unknown error. Please try again later."}
			}
		);
  }
}
