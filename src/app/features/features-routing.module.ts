import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventDashboardComponent } from "./components/event-dashboard/event-dashboard.component";
import { EventComponent } from "./components/event/event.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "event",
    component: EventDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRountingModule {}
