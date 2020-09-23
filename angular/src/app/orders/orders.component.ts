import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cartItems: any;
  noOfItems = 0;
  totalPrice = 0;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const username = localStorage.getItem('userName');
    console.log('user naem is', username);
    if (username){
      this.http.get('http://localhost:3000/api/orders/'  + username).subscribe((res) => {
        console.log('result is', res);
        this.cartItems = res['items'][0];
        console.log(this.cartItems);
        for(let i=0; i<this.cartItems.length; i++){
          this.cartItems[i].quantity = 1;
          this.cartItems[i].price = this.cartItems[i].cost;
          this.totalPrice += this.cartItems[i].cost;
        }
        this.noOfItems = this.cartItems.length;
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
