import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { productInfo } from 'src/app/services/productInfo';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy , OnInit {
  products: any[];
  filterProducts : any[];
  subscribe: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<void>();

  constructor(private productser: ProductsService) {
    this.subscribe = this.productser.getProducts().subscribe(products =>{
      this.filterProducts =this.products = products;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(void 0);
    })
  }
  filter(query:string){
    if(query){
      this.filterProducts = this.products.filter
      (p => p.payload.val().title.toLowerCase().includes(query.toLowerCase()));
    }
    else{
      this.filterProducts = this.products;
    }
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      // processing: true
    };
  }
  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
