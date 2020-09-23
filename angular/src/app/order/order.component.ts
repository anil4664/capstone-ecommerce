import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyordersService } from '../myorders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, public myOrdersService: MyordersService, private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      address1 : ['', Validators.required],
      address2 : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required],
      country : ['', Validators.required],
      pincode : ['', Validators.required],
      chname : ['', Validators.required],
      cardno : ['', Validators.required],
      month : ['', Validators.required],
      year : ['', Validators.required],
      cvv : ['', Validators.required]
    });
    console.log("valus are",this.myOrdersService.cartItems);
  }
  onSubmit(){
    this.submitted = true;
    if (this.orderForm.invalid){
      return;
    }
    const username = localStorage.getItem('userName');
    if(username)
    {
      this.http.put('http://localhost:3000/api/orders/' + username, this.myOrdersService.cartItems).subscribe((res) => {
        console.log('result is', res);
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}
