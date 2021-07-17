import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreateEditEventComponent } from "../create-edit-event/create-edit-event.component";
import { ShowEventComponent } from "../show-event/show-event.component";
import { ConfirmDialogService } from "../../../shared/confirm-dialog/confirm-dialog.service";
import { EventsService } from "../../../core/services/event.service";
import { Event } from "src/app/core/models/event.model";
import { NotificationService } from "src/app/core/services/notification.service";
@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  @Input() data: Event;
  @Output() updateEvents = new EventEmitter();
  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  event;
  isParticipant;
  showMenu;
  constructor(
    public dialogService: ConfirmDialogService,
    public dialog: MatDialog,
    private eventService: EventsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    if (this.userProfile['id'] == this.data.userProfile['id'] || this.userProfile.roles.includes('ROLE_ADMIN')) {
      this.showMenu = true;
    } else (this.showMenu = false);
    this.data.participants && (this.data.participants as any).find(participante => participante.id == this.userProfile.id) ? this.isParticipant = true : this.isParticipant = false;
  }

  openEventDialog() {
    const dialog = this.dialog.open(CreateEditEventComponent, {
      data: {
        mode: "edit",
        event: this.data,
      },
      width: "400px",
    });
    const sub = dialog.componentInstance.eventAdded.subscribe((data) => {
      this.eventService.getEvent(this.data.id).subscribe(res => {
        this.data = res;
        dialog.close();
      });
    });
  }
  deleteEvent() {
    const options = {
      icon: "fas fa-trash-alt",
      title: "Are you sure you want to delete ?",
      message: `This action will remove this Event. Are you sure about this ?`,
      cancelText: "No",
      confirmText: "Yes,Delete",
    };
    this.dialogService.open(options);
    this.dialogService.dialogRef.afterClosed().subscribe(() => {
      this.notificationService.getNotifications().subscribe(res => {
        let notif = res.find(noti => noti.event['id'] == this.data.id);
        this.notificationService.updateNotification(notif.id, {event: null} as any).subscribe(res => {
          this.eventService.deleteEvent(this.data.id).subscribe(re =>{
            this.updateEvents.emit(true);
          });
        })
      });
    });
  }
  ShowDetails() {
    console.log(this.data);
    this.dialog.open(ShowEventComponent, {
      data: this.data,
      width: "600px",
    });
  }

  participate() {
    let participants = [];
    if (!this.data.participants)
      this.data.participants = [];
    else {
      this.data.participants.forEach(participant => {
        participants.push(`/api/user_profiles/${participant.id}`);
      });
      if ((this.data.participants as any).find(participant => participant.id == this.userProfile.id)) {
        participants.splice((participants as any).indexOf(`/api/user_profiles/${this.userProfile.id}`), 1)
      } else {
        participants.push(`/api/user_profiles/${this.userProfile.id}`);
      }
    }
    this.eventService.updateEvent(this.data.id, { participants: participants } as Event).subscribe(res => {
      this.data = res;
      this.data.participants && (this.data.participants as any).find(participante => participante.id == this.userProfile.id) ? this.isParticipant = true : this.isParticipant = false;
    })

  }
}
