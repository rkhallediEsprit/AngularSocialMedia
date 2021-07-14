import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  posts:Post;
  constructor(private postService: PostService) { }


  ngOnInit() {
    this.postService.getPosts().subscribe( res => { 
      this.posts = res['hydra:member'];})
  }

}
