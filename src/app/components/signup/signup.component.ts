import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: [''],
      mobile: ['']
    });

  }
  

  signUp(){
    console.log(this.signupForm.value);
    this.http.post('http://localhost:3000/signupUsers', this.signupForm.value).subscribe(
      response => {
        console.log(response);
        alert('User created successfully');
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    );
  }



}
