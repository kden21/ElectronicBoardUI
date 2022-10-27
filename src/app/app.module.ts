import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
