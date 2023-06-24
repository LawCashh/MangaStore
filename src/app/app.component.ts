import {Component, NgModule} from '@angular/core';
import { Manga } from '../manga.model';
import { CartService } from '../cart.service';
import { LoginComponent } from './login/login.component';
import { SharedService } from '../shared.service';
import { PurchaseService } from "./purchase.service";
import {RegistrationComponent} from "./registration/registration.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'mangastore';
  mangas: Manga[] = [
    { title: 'Naruto', author: 'Masashi', price: 10 },
    { title: 'Bleach', author: 'Author 2', price: 15 },
    { title: 'Tokyo Ghoul', author: 'Author 3', price: 20 },
    { title: 'One Piece', author: 'Author 4', price: 12 },
    { title: 'FMAB', author: 'Author 5', price: 18 }
  ];

  cartItems: { manga: Manga, quantity: number }[] = [];

  constructor(private cartService: CartService, private sharedService: SharedService, private purchaseService: PurchaseService) {}

  addToCart(manga: Manga) {
    this.cartService.addToCart(manga);
    const existingItem = this.cartItems.find(item => item.manga === manga);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ manga, quantity: 1 });
    }
  }

  getCartItems(): Manga[] {
    return this.cartService.getCartItems();
  }

  purchase() {
    const cartItems = this.getCartItems();
    const totalPrice = this.cartService.calculateTotalPrice();
    this.purchaseService.purchaseMangas().subscribe(
      (response) => {
        console.log('Purchase successful', response);
        // Clear the cart after successful purchase
        this.cartService.clearCart();
      },
      (error) => {
        console.error('Purchase failed', error);
      }
    );
  }

  isLoggedIn() {
    console.log("is logged in pozvano u app.component.ts, vrijednost je " + this.sharedService.isLogged)
    return this.sharedService.isLogged;
  }
}

