import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterComponent } from 'src/app/features/components/register/register.component';

@Component({
  selector: 'app-http-response-dialog',
  templateUrl: './http-response-dialog.component.html',
  styleUrls: ['./http-response-dialog.component.scss']
})
export class HttpResponseDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
