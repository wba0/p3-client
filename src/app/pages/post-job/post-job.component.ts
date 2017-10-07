import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  languages: string[];
  newJob: any = {};
	pricePerWord: number = 0.06;

	languageType: string;

  constructor(
    private authenticator: AuthApiService,
    private jobsApi: JobsApiService
  ) { }

  ngOnInit() {
    this.newJob.sourceLanguage = "what";

  }

  countWords() {
		const wordCount = this.newJob.content.split(" ").length;
		const characterCount = this.newJob.content.length;

    switch (this.languageType) {
      case 'character':
        console.log('Oranges are $0.59 a pound.');
        break;
      case 'alphabet':
        console.log('Apples are $0.32 a pound.');
        break;
      default:
        console.log('Sorry, we are out of');

				this.newJob.wordCount = wordCount;
				this.newJob.price = `$${Number(this.newJob.wordCount * this.pricePerWord).toFixed(2)}`;
    }







  }
}
