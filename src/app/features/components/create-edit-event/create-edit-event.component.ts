import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "app-create-edit-event",
  templateUrl: "./create-edit-event.component.html",
  styleUrls: ["./create-edit-event.component.scss"],
})
export class CreateEditEventComponent implements OnInit {
  eventForm = new FormGroup({
    eventName: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    dateOfEvent: new FormControl(null, Validators.required),
    eventPicture: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (
      this.data &&
      this.data.event &&
      this.data.mode &&
      this.data.mode === "edit"
    ) {
      Object.keys(this.eventForm.controls).forEach((key) => {
        this.eventForm.controls[key].setValue(this.data.event[key]);
      });
    }
  }
  save() {
    console.log(this.eventForm);
  }
}
