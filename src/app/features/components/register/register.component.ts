import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credentials } from 'src/app/core/models/credentials.model';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { CredentialsService } from 'src/app/core/services/credential.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    emailAddress: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    credential: new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      isAdmin: new FormControl(false, Validators.required)
    })
  });

  usernameError = "Username Already Exists";
  showUsernameExistance = false;
  showPasswordError = false;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userProfileService: UserProfileService, private credentialsService: CredentialsService) { }

  ngOnInit() {
    (this.registerForm.controls['credential'] as FormGroup).controls.username.valueChanges.subscribe(value => {
      if (value && value.trim() != "")
        this.credentialsService.checkUsername(value).subscribe(res => {
          res ? this.showUsernameExistance = true : this.showUsernameExistance = false;
        }, err => {
          this.showUsernameExistance = false
        });
    });
    (this.registerForm.controls['credential'] as FormGroup).controls.password.valueChanges.subscribe(value => {
      if (value) {
        let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
        !regex.test(value) ? this.showPasswordError = true : this.showPasswordError = false;
      }
    });
  }

  log() {
    console.log(this.registerForm);
  }

  register() {
    let userProfile = new UserProfile();
    let credential = new Credentials();


    Object.keys(this.registerForm.value.credential).forEach(key => {
      credential[key] = this.registerForm.value.credential[key];
    });

    Object.keys(this.registerForm.value).forEach(key => {
      if (key !== 'credential')
        userProfile[key] = this.registerForm.value[key];
    });

    this.credentialsService.createCredential(credential).subscribe(res => {
      userProfile.credential = `/api/credentials/${res.id}`;
      this.userProfileService.createUsers(userProfile).subscribe(response => {
        this.userProfileService.sendEmail(userProfile.emailAddress, credential.username).subscribe(res => {
          this.dialogRef.close();
        })
      });
    })
  }
}
