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
  loginPressed:boolean = false;
  constructor(private authService: AuthService, public sharedService: SharedService) {}
  login() {
    const email = this.email; // Replace with actual email input value
    const password = this.password; // Replace with actual password input value
    console.log("email je " + email);

    this.authService.login(email, password).subscribe(
      (response) => {
        // Login successful
        console.log('Login uspjesan');
        window.alert('Login uspjesan')
        this.authService.setLoggedIn(true);
        this.sharedService.isLogged = true;
        this.sharedService.email = email;
        this.logged = true;
      },
      (error) => {
        window.alert("login neuspjesan");
        console.error('Login failed', error);
        this.sharedService.isLogged = false;
        this.sharedService.email = "";
        this.logged = false;
      }
    );
  }

  odjavljivanje() {
    window.location.reload();
  }
}
