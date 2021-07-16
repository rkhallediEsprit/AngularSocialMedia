import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  @Input() userdata: UserProfile;
  posts: Post[] = [];
  constructor(private postService: PostService) { }


  ngOnInit() {
    if (!this.userdata) {
      this.postService.getPosts().subscribe(res => {
        this.posts = res;
      });
    }
    else {
      this.postService.getPostByUserId(this.userdata.id).subscribe(res => {
        console.log(this.posts)
        this.posts = res
      })

    }
  }

}