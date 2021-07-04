import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRountingModule } from './features-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileService } from '../core/services/user-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { CredentialsService } from '../core/services/credential.service';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FeaturesRountingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    UserProfileService,
    CredentialsService
  ]
})
export class FeaturesModule { }