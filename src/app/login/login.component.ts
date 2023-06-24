import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  logged: boolean = false;
  constructor(private authService: AuthService, private sharedService: SharedService) {}

  login() {
    const email = this.email; // Replace with actual email input value
    const password = this.password; // Replace with actual password input value
    console.log("email je " + email);

    this.authService.login(email, password).subscribe(
      (response) => {
        // Login successful
        console.log('Login successful');
        this.authService.setLoggedIn(true); // Call the setLoggedIn() method
        this.sharedService.isLogged = true;
        this.sharedService.email = email;
      },
      (error) => {
        // Login failed
        console.error('Login failed', error);
      }
    );
  }
}
