import {Routes, RouterModule} from '@angular/router';
import {HomemainComponent} from "./components/homemain/homemain.component";
import {SignInCardComponent} from "./pages/sign-in-card/sign-in-card.component";
import {RegisterCardComponent} from "./pages/register-card/register-card.component";
import {AdvtAddCardComponent} from "./Ad/advt-add-card/advt-add-card.component";
import {AuthGuard} from "./services/auth.guard";
import {UserComponent} from "./pages/user/user.component";
import {ColllectionUsersComponent} from "./Admin/colllection-users/colllection-users.component";
import {AdvtComponent} from "./components/advt/advt.component";
import {WriteReportProfileComponent} from "./components/reports/write-report-profile/write-report-profile.component";
import {UserReportCardComponent} from "./Admin/user-report-card/user-report-card.component";
import {UserReportsComponent} from "./Admin/user-reports/user-reports.component";
import {AdvtReportsComponent} from "./Admin/advt-reports/advt-reports.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {PasswordRecoveryComponent} from "./pages/password-recovery/password-recovery.component";
import {AdvtFavoriteListComponent} from "./pages/advt-favorite-list/advt-favorite-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AdminGuard} from "./services/admin.guard";
import {ChatComponent} from "./components/chat/chat.component";

const itemRoutes: Routes = [
  { path: ':conversationId', component: ChatComponent }
]
const appRoutes: Routes = [

  {path: '', component: HomemainComponent},
  {path: 'account/login', component: SignInCardComponent},
  {path: 'account/register', component: RegisterCardComponent},
  {path: 'create_advt', component: AdvtAddCardComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserComponent},
  {path: 'users', component: ColllectionUsersComponent, canActivate:[AdminGuard]},
  {path: 'advts/:id', component: AdvtComponent},
  {path: 'write_report-profile', component: WriteReportProfileComponent},
  {path: 'report', component: UserReportCardComponent},
  {path: 'user-reports', component: UserReportsComponent, canActivate:[AdminGuard]},
  {path: 'advt-reports', component: AdvtReportsComponent, canActivate:[AdminGuard]},
  {path: 'edit_profile', component: EditProfileComponent},
  {path: 'account/password_recovery', component: PasswordRecoveryComponent},
  {path: 'users/:id/favorite', component: AdvtFavoriteListComponent},
  {path: 'chat', component: ChatComponent, children: itemRoutes},
  {path: '**', component: NotFoundComponent}
];
@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppRoutingModule {}
