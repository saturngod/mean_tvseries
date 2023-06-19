import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Router } from './app.route';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { LoginComponent } from './login/login.component';
import { StartRatingComponent } from './start-rating/start-rating.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { PaginationComponent } from './pagination/pagination.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SeriesComponent,
    LoginComponent,
    RegisterComponent,
    StartRatingComponent,
    PaginationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(Router)
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass : AuthenticationInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }