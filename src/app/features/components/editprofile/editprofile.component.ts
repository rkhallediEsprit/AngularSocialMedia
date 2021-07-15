import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { UserProfile } from "src/app/core/models/user-profile.model";
import { AuthenticationService } from "src/app/core/services/service-api/authentication.service";
import { UserProfileService } from "src/app/core/services/user-profile.service";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.scss"],
})
export class EditprofileComponent implements OnInit {
  @Output() isPutting = new EventEmitter();

  @Output() onAdd = new EventEmitter<UserProfile>();

  editForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    emailAddress: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    bio: new FormControl(true),
  });

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfile,
    private userProfileService: UserProfileService,
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (this.data) {
      Object.keys(this.editForm.controls).forEach((key) => {
        this.editForm.controls[key].setValue(this.data[key]);
      });
    }
  }


  async check() {
    if (this.editForm.controls["isActive"].value) {
      this.updateUser();
    } else {
      await this.updateUser();
      this.authService.logout();
      this.navigateTo("/login");
    }
  }

  async updateUser() {
    let editeduserProfile = new UserProfile();
    let userafterEdit = new UserProfile();
    Object.keys(this.editForm.value).forEach((key) => {
      if (key !== "credential")
        editeduserProfile[key] = this.editForm.value[key];
    });
    this.isPutting.emit(true);
    let user = await this.userProfileService
      .updateUsers(this.data.id, editeduserProfile)
      .toPromise()
    this.isPutting.emit(false);
    this.onAdd.emit(user);
  }
  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
// () => {
//   this.isPutting = false;
//   this.onAdd.emit(editeduserProfile);
// });