import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EVENT } from "../../../core/services/mock-event";
import { CreateEditEventComponent } from "../create-edit-event/create-edit-event.component";
import { ShowEventComponent } from "../show-event/show-event.component";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  @Input() data: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.data);
  }
  openEventDialog() {
    this.dialog.open(CreateEditEventComponent, {
      data: {
        mode: "edit",
        event: this.data,
      },
      width: "400px",
    });
  }
  ShowDetails() {
    console.log(this.data);
    this.dialog.open(ShowEventComponent, {
      data: this.data,
      width: "500px",
    });
  }
}
