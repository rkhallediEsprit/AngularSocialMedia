import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { PostService } from 'src/app/core/services/post.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { EditprofileComponent } from '../editprofile/editprofile.component';



@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() userdata: UserProfile;
  @Input() ismainUser: any;
  @Output() loading = new EventEmitter();
  upload = new FormControl();
  currentUser: UserProfile = JSON.parse(localStorage.getItem('currentUser'));
  userUsername: string = JSON.parse(localStorage.getItem('loggedInUser'));

  constructor(private router: Router, public dialog: MatDialog, private postService: PostService, private userProfileService: UserProfileService) { }

  ngOnInit() {
    console.log(this.ismainUser);
  }

  openEditInformationDialog() {
    let dialogRef = this.dialog.open(EditprofileComponent, {
      data: this.userdata
    });
    dialogRef.componentInstance.data = this.userdata;
    const sub = dialogRef.componentInstance.onAdd.subscribe((data: any) => {
      this.userdata = data
      dialogRef.close()
    });
    dialogRef.componentInstance.isPutting.subscribe((data: any) => {
      this.loading.emit(data);
    });

  }
  onNotifyClicked(user: UserProfile): void {
    this.userdata = user;
  }

  navigateToProfile() {
    this.router.navigate(['profile', this.currentUser['id']]);
  }

  handleFile(file: File) {
    this.postService.fileUpload(file).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.userProfileService.updateUsers(this.currentUser.id, { profilePicture: event['body']['filePath'] } as any).subscribe(res => {
          Object.keys(res).forEach(key => {
            this.currentUser[key] = res[key];
          });
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        });
      }
    })
  }
}