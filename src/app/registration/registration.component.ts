import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        console.log('Registracija uspjela');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        // Registration failed
        console.error('Registracija neuspjesna', error);
      }
    );
  }
}
