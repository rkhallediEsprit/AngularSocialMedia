import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './core/services/service-api/request-interceptor.service';
import { AuthenticationService } from './core/services/service-api/authentication.service';
import { HeaderComponent } from './header/header.component';
import { FeaturesModule } from "./features/features.module";
import { MatBadgeModule, MatPaginatorModule } from "@angular/material";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CredentialsService } from "./core/services/credential.service";
import { ErrorInterceptor } from "./core/services/service-api/error-interceptor.service";

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FeaturesModule,
    MatPaginatorModule,
    MatBadgeModule
  ],
  providers: [
    AuthenticationService,
    CredentialsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ChangePasswordComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
