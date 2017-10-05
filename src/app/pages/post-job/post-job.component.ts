import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
	languages: string[];
	newJob: any;
  constructor(
		private authenticator: AuthApiService,
		private jobsApi: JobsApiService
	) { }

  ngOnInit() {
  }



}
