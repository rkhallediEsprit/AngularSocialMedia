import { Component, OnInit } from "@angular/core";
import { EventsService } from "../../../core/services/event.service";
import { EVENT } from "../../../core/services/mock-event";
@Component({
  selector: "app-event-dashboard",
  templateUrl: "./event-dashboard.component.html",
  styleUrls: ["./event-dashboard.component.scss"],
})
export class EventDashboardComponent implements OnInit {
  dashboard: any;
  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.updateEvents();
  }

  updateEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.dashboard = res["hydra:member"];
      console.log(this.dashboard);
    });
  }
}
