import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {


  languages: any[] = [
    { language: "english", langDisplay: "English", isoCode: "us" },
    { language: "french", langDisplay: "Français", isoCode: "fr" },
    { language: "spanish", langDisplay: "Español", isoCode: "es" },
    { language: "chinese", langDisplay: "中文", isoCode: "cn" },
    { language: "portugese", langDisplay: "Francais", isoCode: "pt" },
    { language: "japanese", langDisplay: "日本語", isoCode: "jp" }
  ];


  constructor() { }

  addIsoCode(jobArray) {
    jobArray.forEach((job) => {
      const searchString = job.sourceLanguage;
      const matchedEntry = this.languages.find(o => {
        return o.language === searchString;
      });
      job.sourceLanguageIsoCode = matchedEntry.isoCode;
    });
		}

	findIsoCode(languageParam){
			return this.languages.find(o => o.language = languageParam).isoCode;

  }

}
