import {computed, effect, Injectable, signal} from "@angular/core";
import {CartItem} from "./cart";
import {Product} from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([])
  cartCount = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0))

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
        item.quantity -= 1
        if (item.quantity === 0) {
          return cartItems.filter(item => item.product.id !== product.id)
        }
        return [...cartItems]
      }
      return cartItems
    })
  }

  onQuantitySelected(product: Product, quantity: number) {
    this.cartItems.update(cartItems => {
      const item = cartItems.find(item => item.product.id === product.id)
      if (item) {
        item.quantity = quantity
        return [...cartItems]
      }
      return cartItems
    })
  }
}
