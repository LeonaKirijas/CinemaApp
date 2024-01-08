import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-user-profile',
  template: `
  <div class="cantainer" *ngIf="auth.user$ | async as user">
	    <h2>Profile Info</h2>
	      <div class="main">
		      <div class="profile">
			      <div class="pro-im-na">
				      <div class="img">
                <img [src]="user.picture" />
				      </div>
				    <div class="name">{{ user.name }}</div>
				  <div class="job">{{ user.nickname }}</div>
			  </div>
			<div class="alltion">
			  <button class="btn">Email: {{ user.email }}</button>
			  <button class="btn">Verified Email: {{ user.email_verified ? 'Yes' : 'No' }}</button>
			</div>
		</div>
	  </div>
  </div>`,
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  constructor(public auth: AuthService) { }
}

