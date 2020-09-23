import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  images: any;
  imgURL: any;
  dbImage: any;
  productsForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private rest: RestApiService) { }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      image: ['', Validators.required],
      cost: ['', Validators.required],
    });
  }

  getImages(){
    this.http.get('http://localhost:3000/api/').subscribe((res) => {
      console.log(res);
      this.dbImage = res['image'];
      this.imgURL = `data:image/png;base64,${this.dbImage}`;
    });
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    console.log('inside select image function')
  }

  sendProduct(){
    const formData = new FormData();
    this.submitted = true;
    if (this.productsForm.invalid){
      return;
    }
    formData.append('file', this.images);
    formData.append('name', this.productsForm.value.productName);
    formData.append('brand', this.productsForm.value.brand);
    formData.append('category', this.productsForm.value.category);
    formData.append('subcategory', this.productsForm.value.subcategory);
    formData.append('cost', this.productsForm.value.cost);
    console.log("form data is", formData);
    this.rest.addUser('http://localhost:3000/api/products', formData).subscribe((res) => {
      console.log("result is",res);
    });
  }
}
