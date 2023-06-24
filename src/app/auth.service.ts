import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/register', { email, password });
  }

  login(email: string, password: string) {
    console.log("pozivam auth.service, email je " + email)
    return this.http.post('http://localhost:3000/login', { email, password });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
}

