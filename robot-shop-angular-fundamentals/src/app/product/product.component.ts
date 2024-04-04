import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../catalog/product.model";
import {CurrencyPipe, NgClass} from "@angular/common";

@Component({
  selector: 'bot-product',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: IProduct
  @Output() buyProduct = new EventEmitter<IProduct>()

  getImageUrl(product: IProduct) {
    return '/assets/images/robot-parts/' + product.imageName
  }

  getDiscountedClass(product: IProduct) {
    return product.discount > 0 ? ['strikethrough'] : ''
  }

  onBuy(product: IProduct) {
    this.buyProduct.emit(product)
  }

}
