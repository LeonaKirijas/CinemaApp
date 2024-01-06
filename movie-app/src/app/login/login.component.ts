import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
      loginData={
        email: '',
        password: ''
      };

      onLoginSubmit()
      {
        console.log('Login Data', this.loginData);
      }
}
