import {Component, Input} from '@angular/core';
import {IProduct} from "../catalog/product.model";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'bot-product',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: IProduct


  getImageUrl(product: IProduct) {
    return '/assets/images/robot-parts/' + product.imageName
  }

}
