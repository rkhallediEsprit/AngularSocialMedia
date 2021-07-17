import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CredentialsService } from '../core/services/credential.service';
import { RegisterComponent } from '../features/components/register/register.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  credentialsForm = new FormGroup({
    username: new FormControl(JSON.parse(localStorage.getItem('loggedInUser')), Validators.required),
    password: new FormControl(null, Validators.required)
  });

  @Output() changeCredential = new EventEmitter();

  usernameError = "Username Already Exists";
  showUsernameExistance = false;
  showPasswordError = false;

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.credentialsForm.controls.username.valueChanges.subscribe(value => {
      if (value && value.trim() != "")
        this.credentialsService.checkUsername(value).subscribe(res => {
          res && value !== JSON.parse(localStorage.getItem('loggedInUser')) ? this.showUsernameExistance = true : this.showUsernameExistance = false;
        }, err => {
          this.showUsernameExistance = false
        });
    });
    this.credentialsForm.controls.password.valueChanges.subscribe(value => {
      if (value) {
        let regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
        !regex.test(value) ? this.showPasswordError = true : this.showPasswordError = false;
      }
    });
  }

  changeCredentials() {
    this.credentialsService.updateCredential(JSON.parse(localStorage.getItem('currentUser'))['idCredentials'], this.credentialsForm.value).subscribe(res => {
      this.dialogRef.close();
      this.changeCredential.emit(true);
    });
  }

}
