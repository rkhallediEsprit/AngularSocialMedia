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

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private credentialsService: CredentialsService) { }

  ngOnInit() {
  }

  changeCredentials() {
    this.credentialsService.updateCredential(JSON.parse(localStorage.getItem('currentUser'))['idCredentials'], this.credentialsForm.value).subscribe(res => {
      this.dialogRef.close();
      this.changeCredential.emit(true);
    });
  }

}
