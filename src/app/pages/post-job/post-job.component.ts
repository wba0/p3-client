import { Component, OnInit } from '@angular/core';
import { JobsApiService } from '../../services/jobs.service';
import { AuthApiService } from '../../services/auth-api.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  languages: string[];
  pricePerWord: number = 0.06;
	langArr: any = this.languageService.languages;

  languageType: string;

	pricePer: string = "Price";
	countType: string = "Count";
	errorMessage: string;
	newJob: any = {};

  constructor(
    private authenticator: AuthApiService,
    private jobsApi: JobsApiService,
		private languageService: LanguageService
  ) { }


  ngOnInit() {

  }

	saveNewJob(){
		this.newJob.sourceLanguageIsoCode = "yes"
		console.log(this.newJob);
		this.jobsApi.postJob(this.newJob)
			.subscribe(
				(postedJob: any) => {
					console.log("Post successful: ",postedJob);
					this.errorMessage = "",
					this.newJob = {};
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

  countWords() {
    const wordCount = this.newJob.content.split(" ").length;
    const characterCount = this.newJob.content.length;
    let pricingType;

    switch (this.newJob.sourceLanguage) {
      case 'japanese':
        pricingType = "perCharacter";
        break;
      case 'korean':
        pricingType = "perCharacter";
        break;
      case 'chinese':
        pricingType = "perCharacter";
        break;
      default:
        pricingType = "perWord";
    }
				if (pricingType === "perWord") {
					this.newJob.wordCount = wordCount;
		      this.newJob.priceWithSymbol = `$${Number(this.newJob.wordCount * this.pricePerWord).toFixed(2)}`;
					this.newJob.price = Number(this.newJob.priceWithSymbol.substr(1));
					this.pricePer = "Price per Word:"
					this.countType = "Word Count:"
    		} else {
					this.newJob.wordCount = characterCount;
					this.newJob.priceWithSymbol = `$${Number(this.newJob.wordCount * this.pricePerWord).toFixed(2)}`;
					this.newJob.price = Number(this.newJob.priceWithSymbol.substr(1));
					this.pricePer = "Price per Character:"
					this.countType = "Character Count:"
				}
  }






}
