import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attachment } from 'src/app/core/models/attachment.model';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postForm = new FormGroup({
    description: new FormControl(null),
    file: new FormControl(null)
  });
  stylesCss = {
    'height': '500px'
  };

  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  username = JSON.parse(localStorage.getItem('loggedInUser'));
  imagePath = null;
  progress = 0;
  @Output() postAdded = new EventEmitter();
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(res => {
      console.log(res);
    })
  }

  postSubmit() {
    let post = new Post();
    Object.keys(this.postForm.value).forEach(key => {
      if (key !== "file")
        post[key] = this.postForm.value[key];
    });
    post.dateOfPublishing = new Date();
    post.userProfile = `/api/user_profiles/${this.userProfile.id}`;
    if (this.imagePath) {
      post.filePath = this.imagePath;
    }
    this.postService.createPosts(post).subscribe(res => {
      this.postAdded.emit(res);
      this.postForm.reset();
      this.imagePath = null;
      this.progress = 0;
    });
  }

  handleFile(file: File) {
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
