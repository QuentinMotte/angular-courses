import {Component, inject} from '@angular/core';

import {NgIf, NgFor, NgClass, AsyncPipe} from '@angular/common';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {ProductService} from "../product.service";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe]
})
export class ProductListComponent {
  private productService = inject(ProductService);
  pageTitle = 'Products';
  errorMessage = '';
  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err
      return EMPTY
    })
  );
  readonly selectedProductId$ = this.productService.productSelected$

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
