import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button class="btn-logout" (click)="auth.logout({ logoutParams: { returnTo: 'http://localhost:4200/home' } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
