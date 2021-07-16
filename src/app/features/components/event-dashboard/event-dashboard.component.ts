import { Component, Input, OnInit } from "@angular/core";
import { Event } from "src/app/core/models/event.model";
import { EventsService } from "../../../core/services/event.service";
@Component({
  selector: "app-event-dashboard",
  templateUrl: "./event-dashboard.component.html",
  styleUrls: ["./event-dashboard.component.scss"],
})
export class EventDashboardComponent implements OnInit {
  dashboard: any;
  @Input() user;
  constructor(private eventService: EventsService) { }

  ngOnInit() {
    if (!this.user) {
      this.updateEvents();
    } else {
      this.eventService.getEventsByUserId(this.user.id).subscribe((res) => {
        this.dashboard = res.filter((event: Event) => new Date(event.dateOfEvent) >= new Date());
      });
    }
  }

  updateEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.dashboard = res.filter((event: Event) => new Date(event.dateOfEvent) >= new Date());
    });
  }
}
