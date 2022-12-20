import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { productInfo } from 'src/app/services/productInfo';
import { ProductsService } from 'src/app/services/products.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories:Observable<any[]>;
  id: any;
  product :any = {
    // imgUrl: "",
    // category:"",
    // title:"",
    // price:0
  };
  constructor(
    private categser : CategoriesService,
    private productser: ProductsService,
    private activeRoute :ActivatedRoute,
    private router:Router) {
    this.categories = this.categser.getCategories();

    }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if(this.id){
      this.productser.getProduct(this.id).pipe(take(1)).subscribe((p)=>{
        if(p){
          this.product = p ;
          // console.log(p);
        }
      })
    }
  }
  save(product: any){
    if(this.id){
      this.productser.updateProduct(product.id, product);
    }
    else{
      this.productser.creatProduct(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(confirm("Are you sure you want to remove this product")){
      this.productser.deletProduct(this.id);
    }
    this.router.navigate(['/admin/products']);
  }
}
