import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Comment } from 'src/app/core/models/comment.model';
import { Post } from 'src/app/core/models/post.model';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { PostUpdateComponent } from '../post-update/post-update.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  commentForm = new FormGroup({
    content: new FormControl(null, Validators.required)
  });
  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  username = JSON.parse(localStorage.getItem('loggedInUser'));
  showComments = false;
  @Input() post: Post;
  constructor(private commentService: CommentService, private postService: PostService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  getPost(id: number){
    this.postService.getPost(id).subscribe(res => {
      this.post = res;
    })
  }

  commentSubmit() {
    let comment = new Comment();

    Object.keys(this.commentForm.value).forEach(key => {
      comment[key] = this.commentForm.value[key];
    });
    comment.dateOfComment = new Date().toString();
    comment.userProfile = `/api/user_profiles/${this.userProfile.id}`;
    comment.post = `/api/posts/${this.post.id}`;
    this.commentService.createComments(comment).subscribe(res => {
      this.commentForm.reset();
      this.postService.getPost(this.post.id).subscribe(res => {
        this.post = res;
      })
    });
  }
  like() { }
  openPostUpdateDialog() {
    const dialog = this.dialog.open(PostUpdateComponent, {
      data: this.post,
      width: "600px",
    });
    dialog.afterClosed().subscribe(res => {
      this.getPost(res);
    })
  }

}
