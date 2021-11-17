import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Insurance } from 'src/app/models/insurance';
import { InsuranceService } from 'src/app/services/insurance.service';
import { LoggerService } from 'src/app/services/logger.service';


@Component({
  selector: 'app-insurance-dashboard',
  templateUrl: './insurance-dashboard.component.html',
  styleUrls: ['./insurance-dashboard.component.css']
})

export class InsuranceDashboardComponent implements OnInit {

  username="";
  searchUser="";

  SortByParam = '';
  SortDirection = 'asc';

  formValue !: FormGroup;
  insuranceModelObject: Insurance = new Insurance();

  insuranceData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder: FormBuilder, private insuranceService: InsuranceService, private loggerService:  LoggerService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      policyHoldersName: [''],
      policyAmount: [],
      amountForEmi: [],
      nomineesName: [''],
    });
    this.getInsuranceData();
  }
  clickAddInsurance() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }




  postInsuranceData() {
    this.insuranceModelObject.policyHoldersName = this.formValue.value.policyHoldersName;
    this.insuranceModelObject.policyAmount = this.formValue.value.policyAmount;
    this.insuranceModelObject.amountForEmi = this.formValue.value.amountForEmi;
    this.insuranceModelObject.nomineesName = this.formValue.value.nomineesName;

    this.insuranceService.post(this.insuranceModelObject).subscribe(data => {
      console.log(data);
      alert("Data posted successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getInsuranceData();
    },
      error => {
        alert("Error in posting data");
      });
  }

  getInsuranceData() {
    this.insuranceService.get().subscribe(data => {
      this.insuranceData = data;
      console.log(data);
      this.loggerService.log("after fetching the data from Insurence Service...")
    },
      error => {
        alert("Error in getting data");
      });
  }

  deleteInsuranceData(row: any) {
    this.insuranceService.delete(row.id).subscribe(data => {
      alert("Data deleted successfully");
      this.getInsuranceData();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.insuranceModelObject.id = row.id;
    this.formValue.controls['policyHoldersName'].setValue(row.policyHoldersName);
    this.formValue.controls['policyAmount'].setValue(row.policyAmount);
    this.formValue.controls['amountForEmi'].setValue(row.amountForEmi);
    this.formValue.controls['nomineesName'].setValue(row.nomineesName);
  }

  updateInsuranceData() {
    this.insuranceModelObject.policyHoldersName = this.formValue.value.policyHoldersName;
    this.insuranceModelObject.policyAmount = this.formValue.value.policyAmount;
    this.insuranceModelObject.amountForEmi = this.formValue.value.amountForEmi;
    this.insuranceModelObject.nomineesName = this.formValue.value.nomineesName;

    this.insuranceService.update(this.insuranceModelObject, this.insuranceModelObject.id).subscribe(res => {
      alert("Data updated successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getInsuranceData();
    });

  }

  searchPolicyHolder() {
    this.searchUser=this.username;
  }

  clearPolicyHolder() {
    this.searchUser="";
    this.username="";
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }


}
