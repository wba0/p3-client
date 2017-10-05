import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class JobsApiService {

	baseUrl: string = environment.apiUrl;

  constructor(
		private http: HttpClient
	) { }

	getJobs(){
		return this.http.get(`${this.baseUrl}/api/jobs`);
	};

	getJobDetails(jobId: string){
		return this.http.get(`${this.baseUrl}/api/jobs/jobId`);
	};

	postJob(jobFields){
		return this.http.post(`${this.baseUrl}/api/jobs`,
			jobFields,
			{withCredentials: true});
	};

	deleteJob(jobId: string){
		return this.http.delete(`${this.baseUrl}/api/jobs/jobId`,
		{withCredentials: true});
	};

	getMyJobs(){
		return this.http.get(`${this.baseUrl}/api/myjobs`,
		{withCredentials: true});
	};

	updateJob(jobId: string){
		return this.http.put(`${this.baseUrl}/api/jobs/jobId`,
		{withCredentials: true});
};
	applyToJob(jobId: string){
		return this.http.patch(`${this.baseUrl}/api/jobs/jobId`,
		{withCredentials: true});
	};
}
