import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RestApiService],
})
export class LoginComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private rest: RestApiService) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.messageForm.invalid){
      return;
    }
    this.rest.addUser('http://localhost:3000/api/login', this.messageForm.value).subscribe((res) => {
      if (res["success"]){
        this.success = true;
        localStorage.setItem('userName', this.messageForm.value.email);
        console.log("username is",localStorage.getItem('userName'));
        this.router.navigate(['/']);
      }
      else{
        this.errorMessage = res['message'];
      }
    });
  }
}
