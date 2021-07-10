import { Component, OnInit } from "@angular/core";
import { EVENT } from "../../../core/services/mock-event";
@Component({
  selector: "app-event-dashboard",
  templateUrl: "./event-dashboard.component.html",
  styleUrls: ["./event-dashboard.component.scss"],
})
export class EventDashboardComponent implements OnInit {
  dashboard = EVENT;
  constructor() {}

  ngOnInit() {}
}
