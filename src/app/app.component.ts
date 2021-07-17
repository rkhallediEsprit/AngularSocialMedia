import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from './core/models/event.model';
import { EventsService } from './core/services/event.service';
import { AuthenticationService } from './core/services/service-api/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DigitArt';

  currentUser: any;
  component;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private eventService: EventsService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  refreshEvents() {
    this.eventService.getEvents().subscribe(res => {
      this.component['eventDashboard']['dashboard'] = res.filter((event: Event) => new Date(event.dateOfEvent) >= new Date());
    })
  }

  log(value) {
    console.log(value);
  }
}
