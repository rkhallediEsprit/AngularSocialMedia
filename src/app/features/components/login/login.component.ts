import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/service-api/authentication.service';
import { HttpResponseDialogComponent } from '../../../shared/components/http-response-dialog/http-response-dialog.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  loading = false;

  constructor(public dialog: MatDialog, private authService: AuthenticationService, private route: Router) {
    if (this.authService.currentUserValue) {
      this.route.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

  async login() {
    this.loading = true;
    let response = await this.authService.login(this.loginForm.value);
    if (response) {
      this.loading = false;
      this.route.navigateByUrl('home');
    }
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }
}
