import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserProfile } from '../core/models/user-profile.model';
import { UserProfileService } from '../core/services/user-profile.service';
import { DgaInputComponent } from '../shared/components/dga-input/dga-input.component';

@Component({
  selector: 'dga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl()
  })
  username: string;
  @Output() signout = new EventEmitter();
  options = [];
  @ViewChild('search', { static: false }) search: DgaInputComponent;

    constructor(private router: Router, public dialog: MatDialog, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('loggedInUser'));
    this.searchForm.controls.search.valueChanges.subscribe(value => {
      if (value && !value.name && value.trim() !== "") {
        this.userProfileService.filterUsersByNameOrSurname(value).subscribe(res => {
          this.options = [] = res;
        })
      } else if (!value || value === "") {
        this.search.options = [];
      }
    });
  }

  logout() {
    this.signout.emit(true);
  }

  goToProfile(userProfile: UserProfile) {
    if(userProfile.name)
    console.log(userProfile);
    //this.router.navigateByUrl(`profile/${userProfile.id}`);
  }

  openCredentialsDialog() {
    const dialog = this.dialog.open(ChangePasswordComponent);
    const sub = dialog.componentInstance.changeCredential.subscribe((data) => {
      if (data) {
        this.logout();
      }
    });
    dialog.afterClosed().subscribe(() => {
      sub.unsubscribe();
    })
  }
}
