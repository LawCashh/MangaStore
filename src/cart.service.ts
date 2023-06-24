import { Injectable } from '@angular/core';
import { Manga } from './manga.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private sharedService: SharedService){}
  private cartItems: Manga[] = [];
  private totalPrice = 0;
  private cartTitlesArr = [""];

  addToCart(manga: Manga) {
    this.cartItems.push(manga);
    this.totalPrice+= manga.price;
    this.cartTitlesArr.push(manga.title);
  }

  getCartItems(): Manga[] {
    return this.cartItems;
  }

  getCartTitles(): String[] {
    return this.cartTitlesArr;
  }

  clearCart() {
    this.cartItems = [];
    this.totalPrice = 0;
    this.cartTitlesArr = [""];
  }

  calculateTotalPrice(): number {
    console.log("pozvano calculatetotalprice, totalprice korpe je " + this.totalPrice);
    return this.totalPrice;
  }
}
