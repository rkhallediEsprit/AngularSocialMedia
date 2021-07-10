import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRountingModule } from './features-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileService } from '../core/services/user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { CredentialsService } from '../core/services/credential.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, ProfileCardComponent],
  imports: [
    CommonModule,
    FeaturesRountingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    UserProfileService,
    CredentialsService
  ],
  entryComponents: [
    RegisterComponent
  ]
})
export class FeaturesModule { }