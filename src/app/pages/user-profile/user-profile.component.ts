import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { environment } from '../../../environments/environment'
import { AuthApiService } from '../../services/auth-api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userDetails: any = {};
	baseUrl: string = environment.apiUrl;
	langArr: any = this.languageService.languages;

  constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient,
		private userApi:UsersService,
		private authenticator: AuthApiService,
		private languageService: LanguageService
	) { }

  ngOnInit() {
		this.activatedRoute.params.subscribe((params) =>{
			this.userApi.getUserDetails(params.userId)
			.subscribe(
				(userDetailsFromApi) => {
					this.userDetails = userDetailsFromApi;
					console.log(userDetailsFromApi)
					this.userDetails.languageSkills.forEach((lang) => {
						lang.isoCode = this.langArr.find((o) => {
							return o.language = lang.language;
						}).isoCode;
						console.log(lang.isoCode)
					});
					console.log(this.userDetails.languageSkills);
				},
				(errorMessage) => {
					console.log("Error getting user details: ", errorMessage)
				}
			);

		});

		console.log(this.langArr)


  }
}
