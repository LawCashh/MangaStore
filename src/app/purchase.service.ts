import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { AuthService } from './auth.service';
import { SharedService } from "../shared.service";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  purchaseMangas() {
    const titles = this.cartService.getCartTitles();
    const totalPrice = this.cartService.calculateTotalPrice();
    const email = this.sharedService.email;

    // Make the API call to store the purchase in the database
    // Adjust the API endpoint as per your server configuration
    return this.http.post('http://localhost:3000/purchases', { titles, totalPrice, email });
  }
}
