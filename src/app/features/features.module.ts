import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FeaturesRountingModule } from "./features-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserProfileService } from "../core/services/user-profile.service";
import { HttpClientModule } from "@angular/common/http";
import { CredentialsService } from "../core/services/credential.service";
import { EventComponent } from "./components/event/event.component";
import { EventDashboardComponent } from "./components/event-dashboard/event-dashboard.component";
import { CreateEditEventComponent } from "./components/create-edit-event/create-edit-event.component";
import { ShowEventComponent } from "./components/show-event/show-event.component";
import { ShowConfirmationComponent } from "./components/show-confirmation/show-confirmation.component";
import { PostComponent } from './components/post/post.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostService } from '../core/services/post.service';
import { HomeComponent } from './components/home/home.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { MatButtonModule, MatPaginatorModule } from "@angular/material";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    CreateEditEventComponent,
    ShowEventComponent,
    PostComponent,
    PostCardComponent,
    ProfileCardComponent,
    HomeComponent,
    EventComponent,
    EventDashboardComponent,
    ShowConfirmationComponent
  ],
  imports: [
    CommonModule,
    FeaturesRountingModule,
    SharedModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [UserProfileService, CredentialsService, PostService],
  entryComponents: [RegisterComponent, CreateEditEventComponent, ShowEventComponent,ShowConfirmationComponent],
})
export class FeaturesModule { }
