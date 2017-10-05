import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeedsLoginGuardService } from './guards/needs-login-guard.service';
import { HackGuardService } from './guards/hack-guard.service';

import { AppComponent } from './app.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { PostJobComponent } from './pages/post-job/post-job.component';

const routes: Routes = [
	{path: "login", component: LoginSignupComponent},
	{path: "signup", component: LoginSignupComponent},
	{path: "dashboard", component: DashboardComponent},
	{path: "jobs", component: JobsComponent},
	{path: "post-job", component: PostJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
