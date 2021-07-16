import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { UserProfile } from "../core/models/user-profile.model";
import { CreateEditEventComponent } from "../features/components/create-edit-event/create-edit-event.component";

@Component({
  selector: "dga-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl(),
  });
  username: string;
  @Output() signout = new EventEmitter();

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem("loggedInUser"));
  }

  logout() {
    this.signout.emit(true);
  }

  goToProfile(userProfile: UserProfile) {
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
    });
  }
  createEvent() {
    this.dialog.open(CreateEditEventComponent, {
      data: {
        mode: "create",
      },
      width: "400px",
    });
  }
}
