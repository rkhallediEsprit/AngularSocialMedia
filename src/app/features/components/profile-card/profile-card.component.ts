import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user-profile.model';
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

  currentUser: UserProfile = JSON.parse(localStorage.getItem('currentUser'));
  userUsername: string = JSON.parse(localStorage.getItem('loggedInUser'));

  constructor(private router: Router, public dialog: MatDialog) { }

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
  test() {
    console.log(this.userdata)
  }

  onNotifyClicked(user: UserProfile): void {
    this.userdata = user;
  }

}
