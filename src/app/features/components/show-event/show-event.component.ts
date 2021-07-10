import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-show-event",
  templateUrl: "./show-event.component.html",
  styleUrls: ["./show-event.component.scss"],
})
export class ShowEventComponent implements OnInit {
  event = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if (this.data) {
      Object.keys(this.event).forEach((key) => {
        this.event[key].setValue(this.data.event[key]);
      });
    }
  }
}
