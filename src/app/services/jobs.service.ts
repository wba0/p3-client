import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class JobsApiService {

  baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getJobs() {
    return this.http.get(`${this.baseUrl}/api/jobs`);
  };

	getRelevantJobs() {
		return this.http.get(`${this.baseUrl}/api/jobs/relevantjobs`);
	};

  getJobDetails(jobId: string) {
    return this.http.get(`${this.baseUrl}/api/jobs/${jobId}`);
  };

  postJob(jobFields) {
    return this.http.post(`${this.baseUrl}/api/jobs`,
      jobFields,
      { withCredentials: true });
  };

  deleteJob(jobId: string) {
    return this.http.delete(`${this.baseUrl}/api/jobs/${jobId}`,
      { withCredentials: true });
  };

  getMyOwnedJobs() {
    return this.http.get(`${this.baseUrl}/api/myownedjobs`,
      { withCredentials: true });
  };

  getMyOwnedActiveJobs() {
    return this.http.get(`${this.baseUrl}/api/myownedactivejobs`,
      { withCredentials: true });
  };

  getMyWorkingJobs() {
    return this.http.get(`${this.baseUrl}/api/myworkingjobs`,
      { withCredentials: true });
  };

  getMyAwaitingPaymentJobs() {
    return this.http.get(`${this.baseUrl}/api/myawaitingpaymentjobs`,
      { withCredentials: true });
  };
  getMyFinishedJobs() {
    return this.http.get(`${this.baseUrl}/api/myfinishedandpaidjobs`,
      { withCredentials: true });
  };

  submitJob(jobId: string, jobFields) {
    return this.http.patch(`${this.baseUrl}/api/submitJob/${jobId}`,
			jobFields,
      { withCredentials: true });
  };

finishPaidJob(jobId: string){
	return this.http.patch(`${this.baseUrl}/api/payandcompletejob/${jobId}`,
		{},
		{ withCredentials: true });
};
  applyToJob(jobId: string) {
    return this.http.post(`${this.baseUrl}/api/jobs/apply/${jobId}`,
			{},
      { withCredentials: true });
  };

	acceptOrRejectApplicant(jobId: string, applicantId: string, decision: string){
		return this.http.patch(` ${this.baseUrl}/api/jobs/${jobId}/${applicantId}/${decision}`,
		{},
		{ withCredentials: true });
	};

	acceptOrRejectTranslation(jobId: string, decision: string){
		return this.http.patch(`${this.baseUrl}/api/submittedJob/${jobId}/${decision}`,
		{},
		{ withCredentials: true });
	}
}
