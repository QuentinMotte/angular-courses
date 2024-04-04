import {computed, effect, Injectable, signal} from "@angular/core";
import {CartItem} from "./cart";
import {Product} from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([])

  cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0))
  subTotal = computed(() => this.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0))
  deliveryFee = computed<number>(() => this.subTotal() < 50 ? 5.99 : 0)
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100)
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax())

  eLength = effect(() => console.log('Cart array length:', this.cartItems().length))

  addToCart(product: Product) {
    this.cartItems.update(cartItems => {
      const item = cartItems.find(item => item.product.id === product.id)
      if (item) {
        item.quantity += 1
        return [...cartItems]
      }
      return [...cartItems, {product, quantity: 1}]
    })
  }

  removeFromCart(product: Product) {
    this.cartItems.update(cartItems => {
      const item = cartItems.find(item => item.product.id === product.id)
      if (item) {
        return cartItems.filter(item => item.product.id !== product.id)
      }
      return cartItems
    })
  }

  onQuantitySelected(product: Product, quantity: number) {
    this.cartItems.update(cartItems => cartItems.map(item =>
      item.product.id === product.id ? {...item, quantity} : item
    ))
  }
}
