import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EVENT } from "../../../core/services/mock-event";
import { CreateEditEventComponent } from "../create-edit-event/create-edit-event.component";
import { ShowEventComponent } from "../show-event/show-event.component";
import { ConfirmDialogService } from "../../../shared/confirm-dialog/confirm-dialog.service";
import { EventsService } from "../../../core/services/event.service";
import { switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  @Input() data: any;
  @Output()
  updateEvents = new EventEmitter();
  event;
  constructor(
    public dialogService: ConfirmDialogService,
    public dialog: MatDialog,
    private eventService: EventsService
  ) {}

  ngOnInit() {}

  openEventDialog() {
    this.dialog.open(CreateEditEventComponent, {
      data: {
        mode: "edit",
        event: this.data,
      },
      width: "400px",
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
}
