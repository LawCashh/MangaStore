import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password).subscribe(
      (response) => {
        // Registration successful
        console.log('Registration successful');
        // Perform any additional actions after successful registration
      },
      (error) => {
        // Registration failed
        console.error('Registration failed', error);
      }
    );
  }
}
