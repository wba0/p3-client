import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	loggedInUser: any;
	getUserError: string;
  constructor(
		private authenticator: AuthApiService
	) { }

  ngOnInit() {

  }
}
