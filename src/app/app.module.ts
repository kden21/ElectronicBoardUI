import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderhomeComponent } from './headerhome/headerhome.component';
import { HeaderComponent } from './header/header.component';
import { HomemainComponent } from './homemain/homemain.component';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { AdvtCardComponent } from './advt-card/advt-card.component';
import { AdvtSmallComponent } from './advt-small/advt-small.component';
import { SignInCardComponent } from './sign-in-card/sign-in-card.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { AdvtAddCardComponent } from './advt-add-card/advt-add-card.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewsProfileComponent} from "./reviews/reviews-profile/reviews-profile.component";
import { ReviewComponent } from './reviews/review/review.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes =[

  {path: '', component: HomemainComponent},
  {path: 'account/login', component: SignInCardComponent},
  {path: 'account/register', component: RegisterCardComponent},
  {path: 'create_advt', component:AdvtAddCardComponent},
  {path: 'profile', component:ProfileComponent},
  { path: 'user', component:UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderhomeComponent,
    HeaderComponent,
    HomemainComponent,
    HomecontentComponent,
    AdvtCardComponent,
    AdvtSmallComponent,
    SignInCardComponent,
    RegisterCardComponent,
    AdvtAddCardComponent,
    FooterComponent,
    ProfileComponent,
    ReviewsProfileComponent,
    ReviewComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
