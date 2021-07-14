import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { USER } from 'src/app/core/services/mock-user';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userid = 0;
  userProfile : UserProfile;
  ismainUser : boolean;
  loading : boolean;
  routeSub: Subscription; 
  constructor(private router: Router,  
    private activatedRoute: ActivatedRoute,private userProfileService: UserProfileService) { }

  currentUser: UserProfile = JSON.parse(localStorage.getItem('currentUser'));
  userUsername: string = JSON.parse(localStorage.getItem('loggedInUser'));
  currentuserid : number = JSON.parse(localStorage.getItem('currentUserId'));

   async ngOnInit() {
     console.log("current user id is "+this.currentuserid);
    this.loading = true;
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.userid = params['id'];
    this.getUserDetails(this.userid).then(res => { this.userProfile = res;
     if (this.currentuserid === this.userProfile.id){
      this.ismainUser = true;
    }
    this.loading=false;
      
     
    } );
    

         
     });
    }


   getUserDetails(userid: number):Promise<UserProfile> {
    return this.userProfileService.getUser(userid).toPromise()
  }

}
