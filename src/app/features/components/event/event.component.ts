import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EVENT } from "../../../core/services/mock-event";
import { CreateEditEventComponent } from "../create-edit-event/create-edit-event.component";
import { ShowEventComponent } from "../show-event/show-event.component";
import { ConfirmDialogService } from "../../../shared/confirm-dialog/confirm-dialog.service";
import { EventsService } from "../../../core/services/event.service";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Event } from "src/app/core/models/event.model";
@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  @Input() data: Event;
  @Output()
  updateEvents = new EventEmitter();
  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  event;
  isParticipant;
  constructor(
    public dialogService: ConfirmDialogService,
    public dialog: MatDialog,
    private eventService: EventsService
  ) { }

  ngOnInit() {
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
    this.dialogService.dialogRef
      .afterClosed()
      .pipe(
        switchMap((dialogresult) =>
          dialogresult ? this.eventService.deleteEvent(this.data.id) : EMPTY
        )
      )
      .subscribe((_) => {
        this.updateEvents.emit();
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
