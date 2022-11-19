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
import { UserComponent } from './pages/user/user.component';
import { ColllectionUsersComponent } from './Admin/colllection-users/colllection-users.component';
import { AdvtComponent } from './components/advt/advt.component';
import { AdvtPageComponent } from './pages/advt-page/advt-page.component';
import { WriteReviewComponent } from './components/reviews/write-review/write-review.component';
import { ReportComponent } from './Admin/report/report.component';
import { ReportsComponent } from './Admin/reports/reports.component';
import { EditAdvtComponent } from './Ad/edit-advt/edit-advt.component';
import { ElementActiveArchiveComponent } from './components/element-active-archive/element-active-archive.component';
import { TitleComponent } from './components/title/title.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/auth-interceptor.service";
import {ReviewsAdvtComponent} from "./components/reviews/reviews-advt/reviews-advt.component";
import {ReviewAdvtComponent} from "./components/reviews/review-advt/review-advt.component";
import {ReviewProfileComponent} from "./components/reviews/review/review-profile.component";
import {ReviewsProfileComponent} from "./components/reviews/reviews-profile/reviews-profile.component";
import { CategoryButtonComponent } from './components/category-button/category-button.component';
import { ResultNotificationComponent } from './components/result-notification/result-notification.component';
import {AuthGuard} from "./services/auth.guard";
import { UserOwnerAdvtComponent } from './components/user-owner-advt/user-owner-advt.component';
import {WriteReportProfileComponent} from "./components/reports/write-report/write-report-profile.component";
import { WriteReportAdvtComponent } from './components/reports/write-report-advt/write-report-advt.component';
import {WriteReviewProfileComponent} from "./components/reviews/write-review-profile/write-review-profile.component";
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes =[

  { path: '', component: HomemainComponent },
  { path: 'account/login', component: SignInCardComponent },
  { path: 'account/register', component: RegisterCardComponent },
  { path: 'create_advt', component:AdvtAddCardComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component:UserComponent },
  { path: 'users', component:ColllectionUsersComponent },
  { path: 'advts/:id', component:AdvtComponent },
  { path: 'write_report-profile', component:WriteReportProfileComponent },
  { path: 'report', component:ReportComponent },
  { path: 'reports', component:ReportsComponent },
  { path: 'edit_profile', component:EditProfileComponent},
  { path: 'all', component:AdvtCardComponent},
  { path: '**', component: NotFoundComponent }
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
    ReviewProfileComponent,
    UserComponent,
    ColllectionUsersComponent,
    AdvtComponent,
    AdvtPageComponent,
    WriteReviewComponent,
    ReportComponent,
    ReportsComponent,
    EditAdvtComponent,
    ElementActiveArchiveComponent,
    TitleComponent,
    EditProfileComponent,
    ReviewAdvtComponent,
    ReviewsAdvtComponent,
    CategoryButtonComponent,
    WriteReportProfileComponent,
    ResultNotificationComponent,
    UserOwnerAdvtComponent,
    WriteReportAdvtComponent,
    WriteReviewProfileComponent,
    NotFoundComponent
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
