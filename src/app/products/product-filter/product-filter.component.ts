import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category : string| null;
  categories:Observable<any[]>;
  constructor(private categser : CategoriesService) { }

  ngOnInit(): void {
    this.categories = this.categser.getCategories();
  }

}
