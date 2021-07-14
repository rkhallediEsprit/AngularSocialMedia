import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventDashboardComponent } from "./components/event-dashboard/event-dashboard.component";
import { EventComponent } from "./components/event/event.component";
import { LoginComponent } from "./components/login/login.component";
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PostDashboardComponent } from "./components/post-dashboard/post-dashboard.component";
import { PostUpdateComponent } from "./components/post-update/post-update.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'postCard',
    component: PostCardComponent
  },
  {
    path: 'postDashboard',
    component: PostDashboardComponent
  },
  {
    path: 'postUpdate',
    component: PostUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRountingModule { }
