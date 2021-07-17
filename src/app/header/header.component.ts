import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatMenuTrigger, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { UserProfile } from "../core/models/user-profile.model";
import { UserProfileService } from "../core/services/user-profile.service";
import { CreateEditEventComponent } from "../features/components/create-edit-event/create-edit-event.component";
import { DgaInputComponent } from "../shared/components/dga-input/dga-input.component";
import { NotificationService } from "../core/services/notification.service";
import { ShowConfirmationComponent } from "../features/components/show-confirmation/show-confirmation.component";
import { ShowEventComponent } from "../features/components/show-event/show-event.component";

@Component({
  selector: "dga-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() data: any;
  searchForm = new FormGroup({
    search: new FormControl(),
  });
  username: string;
  @Output() signout = new EventEmitter();
  @Output() eventAdded = new EventEmitter();
  options = [];
  @ViewChild("search", { static: false }) search: DgaInputComponent;
  displayedNotif: any[];
  notif: any[];
  clickHoverMenuTrigger: MatMenuTrigger;
  currentUser: UserProfile = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userProfileService: UserProfileService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("loggedInUser"));
    this.searchForm.controls.search.valueChanges.subscribe((value) => {
      if (value && !value.name && value.trim() !== "") {
        this.userProfileService
          .filterUsersByNameOrSurname(value)
          .subscribe((res) => {
            this.options = [] = res;
          });
      } else if (!value || value === "") {
        this.search.options = [];
      }
    });
    this.getNotification();
  }

  logout() {
    this.signout.emit(true);
  }

  goToProfile(userProfile: UserProfile, currentId: boolean) {
    if (userProfile && userProfile.id && !currentId)
      this.router.navigateByUrl(`profile/${userProfile.id}`);
    else if (currentId) this.router.navigateByUrl(`profile/${JSON.parse(localStorage.getItem('currentUser'))['id']}`)
  }

  openEventDialog() {
    const dialog = this.dialog.open(CreateEditEventComponent, {
      data: {
        mode: "create",
      },
      width: "400px",
    });
    dialog.componentInstance.eventAdded.subscribe((data) => {
      if (data && (this.router.url.includes('profile') || this.router.url.includes('home'))) {
        this.eventAdded.emit(true);
        dialog.close();
      }
    });
    dialog.componentInstance.notifAdded.subscribe((data) => {
        this.getNotification();
    });
  }

  openCredentialsDialog() {
    const dialog = this.dialog.open(ChangePasswordComponent,{
      width: '600px',
      height: '470px'
    });
    const sub = dialog.componentInstance.changeCredential.subscribe((data) => {
      if (data) {
        this.logout();
      }
    });
    dialog.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  showConfirmation(notification) {
    const dialog = this.dialog.open(ShowConfirmationComponent, {
      width: "600px",
      data: notification,
    });
    dialog.componentInstance.notifDeleted.subscribe(res => {
      this.getNotification();
    });
  }

  getNotification() {
    this.notificationService.getNotifications().subscribe((res) => {
      this.notif = res;
    });
  }
  showDetails(event) {
    this.dialog.open(ShowEventComponent, {
      data: event,
      width: "600px",
    });
  }
}
