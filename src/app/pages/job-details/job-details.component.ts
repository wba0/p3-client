import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { JobsApiService } from '../../services/jobs.service';
import { BeneficiaryService } from '../../services/beneficiary.service';

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

  constructor(
    private authenticator: AuthApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobsApi: JobsApiService,
		private benefApi: BeneficiaryService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params)
      this.jobsApi.getJobDetails(params.jobId)
        .subscribe(
        (oneJobDetails: any) => {
          console.log("job details info : ", oneJobDetails)
          this.oneJob = oneJobDetails;
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
      });
  }

	handleBenef(arg){
		console.log(arg)
	}

  translateJob() {
		this.oneJob.undergoingWork = false;
		this.jobsApi.updateJob(this.oneJob._id, this.oneJob)
      .subscribe(
      (data) => {
        console.log(data)
      });
  }
}
