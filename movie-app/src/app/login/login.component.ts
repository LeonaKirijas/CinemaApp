import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  template: '<button class="button-login" (click)="auth.loginWithRedirect()">Log innnnn</button>',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public auth: AuthService) {}
}
