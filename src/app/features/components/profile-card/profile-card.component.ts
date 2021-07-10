import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/core/models/user-profile.model';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  currentUser: UserProfile = JSON.parse(localStorage.getItem('currentUser'));
  userUsername: string = JSON.parse(localStorage.getItem('loggedInUser'));

  constructor() { }

  ngOnInit() {
  }

}
