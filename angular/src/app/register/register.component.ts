import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RestApiService]
})
export class RegisterComponent implements OnInit {
  messageForm: FormGroup;
  errorMessage: any;
  submitted = false;
  success = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private rest: RestApiService) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password1: ['', Validators.required]
    });
  }
  onSubmit(){
    this.submitted = true;
    if (this.messageForm.invalid || this.messageForm.value.password !== this.messageForm.value.password1){
      return;
    }
    this.rest.addUser('http://localhost:3000/api/register', this.messageForm.value).subscribe((res) => {
      console.log('result is', res);
      if (res['success']){
        this.success = true;
        console.log("inside onsubmit");
        this.router.navigate(['/']);
      }
      else{
        this.errorMessage = res['message'];
      }
    });
  }
}
