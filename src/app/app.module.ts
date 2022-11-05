import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderhomeComponent } from "./components/headerhome/headerhome.component";
import { HeaderComponent } from './components/header/header.component';
import { HomemainComponent } from "./components/homemain/homemain.component";
import { AdvtCardComponent } from './Ad/advt-card/advt-card.component';
import { AdvtSmallComponent } from './Ad/advt-small/advt-small.component';
import { SignInCardComponent } from './pages/sign-in-card/sign-in-card.component';
import { RegisterCardComponent } from './pages/register-card/register-card.component';
import { AdvtAddCardComponent } from './Ad/advt-add-card/advt-add-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewsProfileComponent} from "./components/reviews/reviews-profile/reviews-profile.component";
import { ReviewComponent } from './components/reviews/review/review.component';
import { UserComponent } from './pages/user/user.component';
import { ColllectionUsersComponent } from './Admin/colllection-users/colllection-users.component';
import { AdvtComponent } from './components/advt/advt.component';
import { AdvtPageComponent } from './pages/advt-page/advt-page.component';
import { WriteReportComponent } from './pages/write-report/write-report.component';
import { WriteReviewComponent } from './components/write-review/write-review.component';
import { ReportComponent } from './Admin/report/report.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { EditAdvtComponent } from './Ad/edit-advt/edit-advt.component';
import { ElementActiveArchiveComponent } from './components/element-active-archive/element-active-archive.component';
import { TitleComponent } from './components/title/title.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/auth-interceptor.service";

const appRoutes: Routes =[

  { path: '', component: HomemainComponent },
  { path: 'account/login', component: SignInCardComponent },
  { path: 'account/register', component: RegisterCardComponent },
  { path: 'create_advt', component:AdvtAddCardComponent },
  { path: 'users/:id', component:UserComponent },
  { path: 'users', component:ColllectionUsersComponent },
  { path: 'advts/:id', component:AdvtComponent },
  { path: 'write_report', component:WriteReportComponent },
  { path: 'report', component:ReportComponent },
  { path: 'reports', component:ReportsComponent },
  { path: 'edit_profile', component:EditProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderhomeComponent,
    HeaderComponent,
    HomemainComponent,
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
    ColllectionUsersComponent,
    AdvtComponent,
    AdvtPageComponent,
    WriteReportComponent,
    WriteReviewComponent,
    ReportComponent,
    ReportsComponent,
    EditAdvtComponent,
    ElementActiveArchiveComponent,
    TitleComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
