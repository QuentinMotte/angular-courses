import {Component, inject, OnInit} from '@angular/core';
import {IProduct} from "./product.model";
import {CurrencyPipe} from "@angular/common";
import {ProductComponent} from "../product/product.component";
import {ProductService} from "./product.service";
import {CartService} from "../cart/cart.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  imports: [
    CurrencyPipe,
    ProductComponent,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class CatalogComponent implements OnInit {
  products: IProduct[] = [];
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    })
    this.route.queryParams.subscribe(params => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === '' ? this.products : this.products.filter((product: IProduct) => product.category === this.filter);
  }
}
