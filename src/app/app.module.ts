import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import {NgxMaskModule} from 'ngx-mask';
import {NgxCaptchaModule} from "ngx-captcha";
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import {AppComponent} from './app.component';
import {HeaderhomeComponent} from "./components/headerhome/headerhome.component";
import {HeaderComponent} from './components/header/header.component';
import {HomemainComponent} from "./components/homemain/homemain.component";
import {AdvtCardComponent} from './Ad/advt-card/advt-card.component';
import {AdvtSmallComponent} from './Ad/advt-small/advt-small.component';
import {SignInCardComponent} from './pages/sign-in-card/sign-in-card.component';
import {RegisterCardComponent} from './pages/register-card/register-card.component';
import {AdvtAddCardComponent} from './Ad/advt-add-card/advt-add-card.component';
import {FooterComponent} from './components/footer/footer.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserComponent} from './pages/user/user.component';
import {ColllectionUsersComponent} from './Admin/colllection-users/colllection-users.component';
import {AdvtComponent} from './components/advt/advt.component';
import {AdvtPageComponent} from './pages/advt-page/advt-page.component';
import {WriteReviewComponent} from './components/reviews/write-review/write-review.component';
import {UserReportCardComponent} from './Admin/user-report-card/user-report-card.component';
import {UserReportsComponent} from './Admin/user-reports/user-reports.component';
import {EditAdvtComponent} from './Ad/edit-advt/edit-advt.component';
import {ElementActiveArchiveComponent} from './components/element-active-archive/element-active-archive.component';
import {TitleComponent} from './components/title/title.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./services/auth-interceptor.service";
import {ReviewsAdvtComponent} from "./components/reviews/reviews-advt/reviews-advt.component";
import {ReviewAdvtComponent} from "./components/reviews/review-advt/review-advt.component";
import {ReviewProfileComponent} from "./components/reviews/review/review-profile.component";
import {ReviewsProfileComponent} from "./components/reviews/reviews-profile/reviews-profile.component";
import {CategoryButtonComponent} from './components/category-button/category-button.component';
import {ResultNotificationComponent} from './components/result-notification/result-notification.component';
import {AuthGuard} from "./services/auth.guard";
import {WriteReviewProfileComponent} from "./components/reviews/write-review-profile/write-review-profile.component";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UserOwnerAdvtComponent} from "./components/user-owner-advt/user-owner-advt.component";
import {WriteReportProfileComponent} from "./components/reports/write-report-profile/write-report-profile.component";
import {WriteReportAdvtComponent} from "./components/reports/write-report-advt/write-report-advt.component";
import {AdvtReportCardComponent} from './Admin/advt-report-card/advt-report-card.component';
import {AdvtReportsComponent} from './Admin/advt-reports/advt-reports.component';
import {LoadingComponent} from './components/loading/loading.component';
import {ErrorInterceptor} from "./services/error.interceptor";
import {NotificationComponent} from './components/notification/notification.component';
import {ShowPhotoAdvtComponent} from './components/show-photo-advt/show-photo-advt.component';

import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { AdvtFavoriteListComponent } from './pages/advt-favorite-list/advt-favorite-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserContactComponent } from './components/chat/user-contact/user-contact.component';

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
    UserReportCardComponent,
    UserReportsComponent,
    EditAdvtComponent,
    ElementActiveArchiveComponent,
    TitleComponent,
    EditProfileComponent,
    ReviewAdvtComponent,
    ReviewsAdvtComponent,
    CategoryButtonComponent,
    WriteReportProfileComponent,
    WriteReportAdvtComponent,
    ResultNotificationComponent,
    UserOwnerAdvtComponent,
    WriteReviewProfileComponent,
    NotFoundComponent,
    AdvtReportCardComponent,
    AdvtReportsComponent,
    LoadingComponent,
    NotificationComponent,
    ShowPhotoAdvtComponent,
    ErrorNotificationComponent,
    PasswordRecoveryComponent,
    AdvtFavoriteListComponent,
    ChatComponent,
    UserContactComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxCaptchaModule,
    NzNotificationModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
