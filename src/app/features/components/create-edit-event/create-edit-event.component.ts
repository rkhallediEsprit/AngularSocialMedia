import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EMPTY } from "rxjs";
import { EventsService } from "../../../core/services/event.service";
import { UserProfileService } from "../../../core/services/user-profile.service";
@Component({
  selector: "app-create-edit-event",
  templateUrl: "./create-edit-event.component.html",
  styleUrls: ["./create-edit-event.component.scss"],
})
export class CreateEditEventComponent implements OnInit {
  event;

  eventForm = new FormGroup({
    eventName: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    dateOfEvent: new FormControl(null, Validators.required),
    eventPicture: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventsService,
    private userProfileService: UserProfileService
  ) {}

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
    let event = this.eventForm.getRawValue();

    let updateCreateEvent$ = this.eventService.createEvent(
      this.eventForm.getRawValue()
    );
    if (this.data.mode === "edit") {
      updateCreateEvent$ = this.eventService.updateEvent(
        this.data.event.id,
        this.eventForm.getRawValue()
      );
    }
    updateCreateEvent$.subscribe((res) => this.eventForm.patchValue(res));
    this.dialogRef.close();
  }
}
