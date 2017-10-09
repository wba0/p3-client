import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class BeneficiaryService {
	baseUrl: string = environment.apiUrl;

  constructor(
		private http: HttpClient
	) { }
	getBenefs() {
    return this.http.get(`${this.baseUrl}/api/beneficiaries`);
  };

}
