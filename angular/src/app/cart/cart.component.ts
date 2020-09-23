import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {MyordersService} from '../myorders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any;
  noOfItems = 0;
  totalPrice = 0;
  constructor(private router: Router, private myOrders : MyordersService, private http: HttpClient) { }

  ngOnInit(): void {
    this.totalPrice=0;
    const username = localStorage.getItem('userName');
    console.log("username is", username);
    if (username){
      this.http.get('http://localhost:3000/api/' + username).subscribe((res) => {
        console.log('result is', res);
        this.cartItems = res['items'];
        console.log("items are",this.cartItems);
        for(let i=0; i<this.cartItems.length; i++){
          this.cartItems[i].quantity = 1;
          this.cartItems[i].price = this.cartItems[i].cost;
          this.totalPrice += this.cartItems[i].cost;
        }
        this.myOrders.cartItems = this.cartItems;
        this.myOrders.cartItems.totalPrice = this.totalPrice;
        this.noOfItems = this.cartItems.length;
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  removeImage(image){
      const username = localStorage.getItem('userName');
      console.log('user name is:', username, image.imgId);
      this.http.put('http://localhost:3000/api/removecartitem/' + username, {imgId : image.imgId }).subscribe((res) => {
        console.log('result is', res);
        this.ngOnInit();
      });
  }

  increment(image){
    this.totalPrice += image.cost;
    for(let i=0;i<this.cartItems.length;i++){
      if(this.cartItems[i].imgId == image.imgId){
        this.cartItems[i].quantity += 1;
        this.cartItems[i].price += this.cartItems[i].cost;
      }
    }
  }

  decrement(image){
    if(this.totalPrice>0)
    {
    for(let i=0;i<this.cartItems.length;i++){
      if(this.cartItems[i].imgId == image.imgId && this.cartItems[i].quantity>1){
        this.cartItems[i].quantity -= 1;
        this.cartItems[i].price -= this.cartItems[i].cost;
        this.totalPrice -= image.cost;
      }
    }
  }
  }
}
