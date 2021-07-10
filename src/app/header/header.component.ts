import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from '../core/models/user-profile.model';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  logout() {
    this.signout.emit(true);
  }

  goToProfile(userProfile: UserProfile) {
    //this.router.navigateByUrl(`profile/${userProfile.id}`);
  }
}
