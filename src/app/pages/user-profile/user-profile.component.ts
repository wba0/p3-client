import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userDetails: any = {};
	baseUrl: string = environment.apiUrl;

  constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private http: HttpClient
	) { }

  ngOnInit() {
		this.activatedRoute.params.subscribe((params) =>{
			this.userDetails = this.http.get(`${this.baseUrl}/api/users/params.userId`);
		});
  }

}
