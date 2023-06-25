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
    { title: 'Naruto', author: 'Masashi', price: 10 , imgUrl: "../assets/images/naruto.jpeg"},
    { title: 'Bleach', author: 'Author 2', price: 15, imgUrl: "../assets/images/bleach.jpeg" },
    { title: 'Tokyo Ghoul', author: 'Author 3', price: 20, imgUrl: "../assets/images/tokyoghoul.jpg"},
    { title: 'One Piece', author: 'Author 4', price: 12, imgUrl: "../assets/images/onepiece.jpeg" },
    { title: 'FMAB', author: 'Author 5', price: 18 , imgUrl: "../assets/images/fma.jpg"}
  ];
  loginPressed: boolean = false;

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
    const cartTitles = this.cartService.getCartTitles().toString().slice(1);;
    const totalPrice = this.cartService.calculateTotalPrice();
    this.purchaseService.purchaseMangas().subscribe(
      (response) => {
        console.log('Kupovina uspjesna ', response);
        window.alert('Kupovina uspjesna\nNarucili ste: ' + cartTitles + "\nUkupna cijena: " + totalPrice + " eura.");
        this.cartService.clearCart();
      },
      (error) => {
        console.error('Kupovina neuspjesna ', error);
      }
    );
  }

  removeLoginRegister() {
    this.loginPressed = true;
    this.sharedService.loginPressed = true;
  }
  // goBackButton() {
  //   this.loginPressed = false;
  // }
  isLoggedIn() {
    return this.sharedService.isLogged;
  }
}

