import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../../services/beneficiary.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {
	benefs: any[] = [];
  constructor(
		private benefApi: BeneficiaryService
	) { }

  ngOnInit() {
		this.benefApi.getBenefs()
			.subscribe(
				(benesFromApi: any[]) => {
					this.benefs = benesFromApi;
				}
			);
  }

}
