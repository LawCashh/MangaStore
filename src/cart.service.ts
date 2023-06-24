import { Injectable } from '@angular/core';
import { Manga } from './manga.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Manga[] = [];

  addToCart(manga: Manga) {
    this.cartItems.push(manga);
  }

  getCartItems(): Manga[] {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
