import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { Router } from './app.route';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { LoginComponent } from './login/login.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { PaginationComponent } from './pagination/pagination.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';
import { CoverComponent } from './cover/cover.component';
import { EditSeriesFormComponent } from './edit-series-form/edit-series-form.component';
import { EpisodesListComponent } from './episodes-list/episodes-list.component';
import { EditEpisodesFormComponent } from './edit-episode-form/edit-episode-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SeriesComponent,
    LoginComponent,
    RegisterComponent,
    StarRatingComponent,
    PaginationComponent,
    ProfileComponent,
    SearchComponent,
    ModalComponent,
    CoverComponent,
    EditSeriesFormComponent,
    EditEpisodesFormComponent,
    EpisodesListComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(Router, {
      scrollPositionRestoration: 'enabled'
  })
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass : AuthenticationInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
