import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/do";

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
		return(this.http.post(
			`${this.baseUrl}/api/process-signup`,
			userInfo,
			{ withCredentials: true }
		)
		.do((userInfo) =>{
			this.loginStatusSubject.next({
				isLoggedIn: true,
				userInfo: userInfo
			});
		})
	)};

	getLoginStatus(){
		return(this.http.get(
			`${this.baseUrl}/api/checklogin`,
			{ withCredentials: true }
		)
		.do((loggedInInfo) => {
			this.loginStatusSubject.next(loggedInInfo);
		}))
	}

	postLogin(loginCredentials: LoginInterface){
		return(this.http.post(
			`${this.baseUrl}/api/process-login`,
			loginCredentials,
			{ withCredentials: true }
		)
		.do((userInfo) => {
			this.loginStatusSubject.next({
				isLoggedIn: true,
				userInfo: userInfo
			})
		}));
	}

	logOut(){
		return(this.http.delete(
			`${this.baseUrl}/api/logout`,
			{ withCredentials: true }
		)
		.do(() => {
			this.loginStatusSubject.next({ isLoggedIn: false})
		}));
	}
}
