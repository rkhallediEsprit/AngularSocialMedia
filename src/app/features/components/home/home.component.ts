import { Component, OnInit, ViewChild } from '@angular/core';
import { EventDashboardComponent } from '../event-dashboard/event-dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('eventDashboard', { static: false }) eventDashboard: EventDashboardComponent;
  constructor() { }

  ngOnInit() {
  }

}
