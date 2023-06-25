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
    const titles = this.cartService.getCartTitles().toString().slice(1);
    const totalPrice = this.cartService.calculateTotalPrice();
    const email = this.sharedService.email;
    return this.http.post('http://localhost:3000/purchases', { titles, totalPrice, email });
  }
}
