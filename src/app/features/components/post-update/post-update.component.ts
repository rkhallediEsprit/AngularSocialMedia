import { HttpEventType } from '@angular/common/http';
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
    description: new FormControl(null),
    file: new FormControl(null)
  });
  imagePath = null;
  progress = 0;
  constructor(private dialogRef: MatDialogRef<PostUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: Post, private postService: PostService) { }

  ngOnInit() {
    console.log(this.data)
    this.postForm.controls.description.setValue(this.data.description);
    this.imagePath = this.data.filePath;
  }

  save() {
    let post = new Post();
    post.description = this.postForm.value.description;
    post.filePath = this.imagePath;
    this.postService.updatePosts(this.data.id, post).subscribe(res => {
      this.dialogRef.close({ saved: true, post: res.id });
    });
  }

  handleFile(file: File) {
    console.log(file)
    this.postService.fileUpload(file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      if (event.type === HttpEventType.Response) {
        this.imagePath = event['body']['filePath'];
      }
    })
  }

  deleteImage() {
    this.postForm.controls.file.reset();
    this.imagePath = null;
    this.progress = 0;
  }
}
