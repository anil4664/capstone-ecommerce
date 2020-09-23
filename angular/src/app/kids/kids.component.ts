import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MyordersService } from '../myorders.service';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  images: any;

  constructor(private http: HttpClient, private router: Router, private myOrderService : MyordersService) { }

  ngOnInit(): void {
    console.log("hello");
    this.http.get('http://localhost:3000/api/kids').subscribe((res) => {
      console.log("the result is:",res);
      var dbImages = res['images'];
      for (let i=0; i<dbImages.length; i++) {
        dbImages[i].img = `data:image/png;base64,${dbImages[i].img}`;
      }
      console.log("images is",dbImages);
      this.images = dbImages;
    });
  }
  addToWishList(image){
    console.log("image is ",image);
    let userName = localStorage.getItem('userName');
    if(userName)
    {
      console.log("user is logged in");
      console.log('username is', userName);
      this.http.put('http://localhost:3000/api/' + userName, image).subscribe((res) => {
        console.log("result is",res);
      });
      //this.router.navigate(['/cart']);
    }
    else{
      this.router.navigate(['/login']);
    }
    console.log("inside wishlist");
  }

  placeOrder(image){
    this.myOrderService.cartItems = [];
    this.myOrderService.cartItems.push(image);
    this.myOrderService.cartItems.totalPrice = image.cost;
    this.myOrderService.cartItems[0].quantity = 1;
    this.myOrderService.cartItems[0].price = image.cost;
    this.router.navigate(['/order']);
  }

}
