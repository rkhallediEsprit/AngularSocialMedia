import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatMenuTrigger, PageEvent } from '@angular/material';
import { Event, Router } from '@angular/router';
import { UserProfile } from '../core/models/user-profile.model';
import { EVENT } from '../core/services/mock-event';
import { NotificationService } from '../core/services/notification.service';
import { ShowConfirmationComponent } from '../features/components/show-confirmation/show-confirmation.component';
import { ShowEventComponent } from '../features/components/show-event/show-event.component';

@Component({
  selector: 'dga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() data: any;
  searchForm = new FormGroup({
    search: new FormControl()
  })
  username: string;
  @Output() signout = new EventEmitter();
  displayedNotif: any[];
 
  index: number;
  pageSizeOptions: number[] = [5];
  pageEvent: PageEvent;
  notif: any[];
  clickHoverMenuTrigger: MatMenuTrigger;



  constructor(
    private router: Router,
    public dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('loggedInUser'));
    this.getNotification();
  }

  logout() {
    this.signout.emit(true);
  }

  goToProfile(userProfile: UserProfile) {
    //this.router.navigateByUrl(`profile/${userProfile.id}`);
  }
  showConfirmation(notification) {
    this.dialog.open(ShowConfirmationComponent, {
      width: "600px",
      data : notification
    });
  }



  getNotification(){
    this.notificationService.getNotifications().subscribe(res => { this.notif = res['hydra:member'];} )

  }
  showDetails(event) {
    this.dialog.open(ShowEventComponent, {
      data: event,
      width: "600px",
      
    });
   
  }

}
