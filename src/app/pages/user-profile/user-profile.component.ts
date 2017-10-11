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
	userDetails: any = {
		languageSkills : [],
		certifications: []
	};
	baseUrl: string = environment.apiUrl;
	langArr: any = this.languageService.languages;
	errorMessage: string;
	newLanguageSkill: any = {};

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


					this.userDetails.languageSkills.forEach((lang) => {
						lang.isoCode = this.langArr.find((o) => {
							return o.language === lang.language;
						}).isoCode;
						lang.language = lang.language.charAt(0).toUpperCase() + lang.language.substring(1);
					});
					console.log(this.userDetails)
				},
				(errorMessage) => {
					console.log("Error getting user details: ", errorMessage)
				}
			);

		});



  }

	addLanguageSkill(){
		this.userApi.addLanguageSkill(this.newLanguageSkill)
			.subscribe(
				(updatedLanguageSkills: any) => {
					console.log("Post successful: ", updatedLanguageSkills);
					this.errorMessage = "",
					this.userDetails.languageSkills = updatedLanguageSkills;
				},
				(errorInfo) => {
					console.log("Post unsuccessful: ", errorInfo);
					if(errorInfo.status === 400){
						this.errorMessage = "Validation Error"
					} else {
						this.errorMessage = "Unknown error. Please try again later."
					}
				}
			);
	}
}
