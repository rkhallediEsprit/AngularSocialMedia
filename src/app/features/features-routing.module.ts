import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostComponent } from './components/post/post.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'post',
        component: PostComponent
    },
    {
        path: 'postCard',
        component: PostCardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRountingModule { }