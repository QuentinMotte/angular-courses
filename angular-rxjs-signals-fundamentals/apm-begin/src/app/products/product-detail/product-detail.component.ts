import {Component, inject} from '@angular/core';

import {NgIf, NgFor, CurrencyPipe, AsyncPipe} from '@angular/common';
import {Product} from '../product';
import {ProductService} from "../product.service";
import {catchError, EMPTY, Subscription} from "rxjs";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe]
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  errorMessage = '';
  product$ = this.productService.product$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY
    })
  )
  // pageTitle = this.product$ ? `Product Detail for: ${this.product$.productName}` : 'Product Detail';
  pageTitle = 'Product Detail';


  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
