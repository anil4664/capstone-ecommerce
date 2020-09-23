import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {
  cartItems: any;
  orderedItems: any;
  constructor() { }
}
