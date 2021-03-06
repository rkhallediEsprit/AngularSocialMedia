import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FeaturesRountingModule } from "./features-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserProfileService } from "../core/services/user-profile.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CredentialsService } from "../core/services/credential.service";
import { EventComponent } from "./components/event/event.component";
import { EventDashboardComponent } from "./components/event-dashboard/event-dashboard.component";
import { ShowEventComponent } from "./components/show-event/show-event.component";
import { PostComponent } from "./components/post/post.component";
import { PostCardComponent } from "./components/post-card/post-card.component";
import { PostService } from "../core/services/post.service";
import { HomeComponent } from "./components/home/home.component";
import { ProfileCardComponent } from "./components/profile-card/profile-card.component";
import { HttpResponseDialogComponent } from "../shared/components/http-response-dialog/http-response-dialog.component";
import { RequestInterceptorService } from "../core/services/service-api/request-interceptor.service";
import { ConfirmDialogService } from "../shared/confirm-dialog/confirm-dialog.service";
import { PostDashboardComponent } from "./components/post-dashboard/post-dashboard.component";
import { PostUpdateComponent } from "./components/post-update/post-update.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditprofileComponent } from "./components/editprofile/editprofile.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ShowEventComponent,
    PostComponent,
    PostCardComponent,
    ProfileCardComponent,
    HomeComponent,
    EventComponent,
    EventDashboardComponent,
    PostDashboardComponent,
    PostUpdateComponent,
    ProfileComponent,
    EditprofileComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRountingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    UserProfileService,
    CredentialsService,
    PostService,
    ConfirmDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
  entryComponents: [
    RegisterComponent,
    ShowEventComponent,
    HttpResponseDialogComponent,
    EditprofileComponent,
    PostUpdateComponent
  ],
})
export class FeaturesModule {}
