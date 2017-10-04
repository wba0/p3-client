import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './services/auth-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
	userInfo: any;

	constructor(
		private authenticator: AuthApiService,
		private router: Router
	){}

	ngOnInit(){
		this.authenticator.getLoginStatus();
		this.authenticator.loginStatusNotifier
			.subscribe(
				(loggedInInfo: any) => {
					if(loggedInInfo.isLoggedIn){
						this.userInfo = loggedInInfo.userInfo;
					} else{
						this.userInfo = null;
					}
				}
			);
	}

	logMeOut(){
		this.authenticator.logOut()
			.subscribe(
				(logoutResponse) => {
					this.router.navigate(['/']);
				}
			);
	}


}
