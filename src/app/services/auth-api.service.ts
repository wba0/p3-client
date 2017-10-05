import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SignupInterface } from '../interfaces/signup';
import { LoginInterface } from '../interfaces/login';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthApiService {

	baseUrl: string = environment.apiUrl;

	loginStatusSubject =  new BehaviorSubject<any>({ isLoggedIn: false });
	loginStatusNotifier = this.loginStatusSubject.asObservable();

  constructor(
		private http: HttpClient
	) { }

	postSignup(userInfo: SignupInterface) {
		const signupRequest = this.http.post(
			`${this.baseUrl}/api/process-signup`,
			userInfo,
			{ withCredentials: true }
		);
		signupRequest.subscribe((userInfo) =>{
			this.loginStatusSubject.next({
				isLoggedIn: true,
				userInfo: userInfo
			});
		});
		return signupRequest
	}

	getLoginStatus(){
		const loginStatusRequest = this.http.get(
			`${this.baseUrl}/api/checklogin`,
			{ withCredentials: true }
		);
		loginStatusRequest.subscribe((loggedInInfo) => {
			this.loginStatusSubject.next(loggedInInfo);
		});
		return loginStatusRequest;
	}

	postLogin(loginCredentials: LoginInterface){
		const loginRequest = this.http.post(
			`${this.baseUrl}/api/process-login`,
			loginCredentials,
			{ withCredentials: true }
		);
		loginRequest.subscribe((userInfo) => {
			this.loginStatusSubject.next({
				isLoggedIn: true,
				userInfo: userInfo
			})
		});
		return loginRequest;
	}

	logOut(){
		const logoutRequest = this.http.delete(
			`${this.baseUrl}/api/logout`,
			{ withCredentials: true }
		);
		logoutRequest.subscribe(() => {
			this.loginStatusSubject.next({ isLoggedIn: false})
		});
		return logoutRequest;
	}
}
