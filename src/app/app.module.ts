import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AuthApiService } from './services/auth-api.service';
import { NeedsLoginGuardService } from './guards/needs-login-guard.service';
import { HackGuardService } from './guards/hack-guard.service';
import { JobsApiService } from './services/jobs.service';
import { LanguageService } from './services/language.service';

import { AppComponent } from './app.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { PostJobComponent } from './pages/post-job/post-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    DashboardComponent,
    JobsComponent,
    PostJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpClientModule,
		FormsModule,
		AlertModule.forRoot()
  ],
  providers: [
		AuthApiService,
		NeedsLoginGuardService,
		HackGuardService,
		JobsApiService,
		LanguageService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
