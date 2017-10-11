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
}
