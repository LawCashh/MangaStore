import { Component } from '@angular/core';
import { Manga } from '../manga.model';
import { CartService } from '../cart.service';

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

  constructor(private cartService: CartService) {}

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

    // Make an API call to the backend to process the purchase
    // Send the cartItems to the backend

    this.cartService.clearCart();
  }

  isLoggedIn() {
    return true;
  }
}

