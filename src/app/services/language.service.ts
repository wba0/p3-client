import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {


	languages: Array<Object> =[
		{language: "english", langDisplay: "English", isoCode: "en"},
		{language: "french", langDisplay: "Francais", isoCode: "fr"},
		{language: "japanese", langDisplay: "日本語", isoCode: "jp"}
	];


  constructor() { }

}
