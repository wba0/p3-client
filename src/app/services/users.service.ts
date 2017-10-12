import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {

	baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUserDetails(userId) {
    return this.http.get(`${this.baseUrl}/api/users/${userId}`);
  };

	addLanguageSkill(newLanguageSkill: any){
		return this.http.patch(`${this.baseUrl}/api/users/addLanguageSkill`,
		newLanguageSkill,
	{ withCredentials: true }
)};

	deleteLanguageSkill(language: any){
		console.log("lang obj: ", language)
		return this.http.delete(`${this.baseUrl}/api/users/removeLanguageSkill/${language}`,
	{ withCredentials: true }
)};
}
