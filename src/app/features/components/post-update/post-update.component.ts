import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {
  postForm = new FormGroup({
    description: new FormControl(null, Validators.required),
  });
  constructor(private dialogRef: MatDialogRef<PostUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: Post, private postService: PostService) { }

  ngOnInit() {
    this.postForm.controls.description.setValue(this.data.description);
  }

  save() {
    let post = new Post();
    post.description = this.postForm.value.description;
    this.postService.updatePosts(this.data.id, post).subscribe(res => {
      this.dialogRef.close(res.id);
    });
  }

}
