import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor() {}

  ngOnInit(): void {
    const username = localStorage.getItem('userName');
    if(username){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  logout(){
    localStorage.removeItem('userName');
    console.log("usernaem is", localStorage.getItem('userName'));
    this.ngOnInit();
  }

}
