import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-show-confirmation',
  templateUrl: './show-confirmation.component.html',
  styleUrls: ['./show-confirmation.component.scss']
})
export class ShowConfirmationComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ShowConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any, private notificationService: NotificationService) { }

  ngOnInit() {
  }
  closeNotification(){
    this.dialogRef.close()
  }
  deleteNotification(){
this.notificationService.deletenotification(this.data.id).subscribe(res=>{})
this.closeNotification()

  }



}
