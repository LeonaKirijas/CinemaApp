import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowMovieComponent } from './Content/show-movie/show-movie.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LogoutComponent } from './logout/logout.component';
import { BookMovieComponent } from './Content/book-movie/book-movie.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BookingComponent,
    NavbarComponent,
    ShowMovieComponent,
    LogoutComponent,
    BookMovieComponent,
    ProfileComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-7fda1vczp5yjz35s.us.auth0.com',
      clientId: 'q9yFimGw8e9u96KCEuJmiZNbT2ZaQUB3',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }