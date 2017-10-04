import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignupInterface } from '../../interfaces/signup';
import { LoginInterface } from '../../interfaces/login';

import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

	newUser: SignupInterface = {
		signupUsername: '',
		signupPassword: ''
	};

	loginUser: LoginInterface = {
		loginUsername: '',
		loginPassword: ''
	};

	signupError: string;
	loginError: string;

  constructor(
		private authenticator: AuthApiService,
		private router: Router
	) { }

  ngOnInit() {
  }
	signupSubmit(){
		this.authenticator.postSignup(this.newUser)
			.subscribe(
				(userInfo) => {
					this.router.navigate(['']);
				},
				(errorInfo) => {
					console.log("Sign up error: ", errorInfo);
					if(errorInfo.status === 400){
						this.signupError = "Validation error.";
					} else {
						this.signupError =  "Something went wrong. Please try again."
					}
				}
			);
	}

	loginSubmit(){
		this.authenticator.postLogin(this.loginUser)
			.subscribe(
				(userInfo) => {
					this.router.navigate(['']);
				},
				(errorInfo) => {
					console.log("Log in error: ", errorInfo);
					if(errorInfo.status === 401){
						this.loginError = "Bad credentials.";
					} else {
						this.loginError = "Something went wrong. Please try again.";
					}
				}
			);
		}
	}
