import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm = new FormGroup({
    description: new FormControl(null, Validators.required)
  });
  stylesCss = {
    'height': '500px'
  };

  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  username = JSON.parse(localStorage.getItem('loggedInUser'));

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  postSubmit() {
    let post = new Post();


    Object.keys(this.postForm.value).forEach(key => {
      post[key] = this.postForm.value[key];
    });
    post.dateOfPublishing = new Date();
    post.userProfile = `/api/user_profiles/${this.userProfile.id}`;
    this.postService.createPosts(post).subscribe(res => {
      this.postForm.reset();
    });
  }
}
