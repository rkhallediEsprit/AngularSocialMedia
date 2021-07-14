import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {
  postForm = new FormGroup({
    description: new FormControl(null, Validators.required),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public post: any) { }

  ngOnInit() {
    if (
      this.post.mode === "edit" &&
      this.post.description
    ) {
      Object.keys(this.postForm.controls).forEach((key) => {
        this.postForm.controls[key].setValue(this.post.post.description[key]);
      });
    }
  }

}
