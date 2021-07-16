import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EMPTY } from "rxjs";
import { Event } from "src/app/core/models/event.model";
import { NotificationService } from "src/app/core/services/notification.service";
import { EventsService } from "../../../core/services/event.service";
import { UserProfileService } from "../../../core/services/user-profile.service";
@Component({
  selector: "app-create-edit-event",
  templateUrl: "./create-edit-event.component.html",
  styleUrls: ["./create-edit-event.component.scss"],
})
export class CreateEditEventComponent implements OnInit {
  event;
  userProfile = JSON.parse(localStorage.getItem('currentUser'));
  eventForm = new FormGroup({
    eventName: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    dateOfEvent: new FormControl(null, Validators.required),
    eventPicture: new FormControl(null),
    description: new FormControl(null, Validators.required),
  });
  @Output() eventAdded = new EventEmitter();
  @Output() notifAdded = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<CreateEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    if (
      this.data &&
      this.data.event &&
      this.data.mode &&
      this.data.mode === "edit"
    ) {
      this.eventForm.patchValue(this.data.event);
    }
  }
  save() {
    let event = new Event();
    Object.keys(this.eventForm.value).forEach(key => {
      event[key] = this.eventForm.value[key];
    });
    event.userProfile = `/api/user_profiles/${this.userProfile['id']}`;
    let updateCreateEvent$ = this.eventService.createEvent(
      event
    );
    if (this.data.mode === "edit") {
      updateCreateEvent$ = this.eventService.updateEvent(
        this.data.event.id,
        event
      );
    }
    updateCreateEvent$.subscribe((res) => {
      this.eventAdded.emit(true);
      if (this.data.mode === "create") {
        this.notificationService.createNotification({ event: `/api/events/${res['id']}`, creationDate: new Date() } as any).subscribe(res => {
          this.notifAdded.emit(true);
        });
      }
    });
  }
}
