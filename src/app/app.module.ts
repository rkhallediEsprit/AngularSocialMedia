import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestInterceptorService } from "./core/services/service-api/request-interceptor.service";
import { EventComponent } from "./features/components/event/event.component";
import { EventDashboardComponent } from "./features/components/event-dashboard/event-dashboard.component";

@NgModule({
  declarations: [AppComponent, EventComponent, EventDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
