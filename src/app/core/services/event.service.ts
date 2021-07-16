import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Event } from "../models/event.model";

const BASE_PATH = environment.baseBath;

@Injectable({
  providedIn: "root",
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    let header = new HttpHeaders().set("content-type", "application/json");
    return this.http.get<Event[]>(`${BASE_PATH}/events`, {
      headers: header,
    });
  }

  getEvent(id: number): Observable<Event> {
    let header = new HttpHeaders().set("content-type", "application/json");
    return this.http.get<Event>(`${BASE_PATH}/events/${id}`, {
      headers: header,
    });
  }

  createEvent(event: Event): Observable<Event> {
    let header = new HttpHeaders().set("content-type", "application/json");
    return this.http.post<Event>(`${BASE_PATH}/events`, event, {
      headers: header,
    });
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    let header = new HttpHeaders().set("content-type", "application/json");
    return this.http.put<Event>(`${BASE_PATH}/events/${id}`, event, {
      headers: header,
    });
  }

  deleteEvent(id: number): Observable<any> {
    const header = new HttpHeaders().set("content-type", "application/json");
    return this.http.delete(`${BASE_PATH}/events/${id}`, { headers: header });
  }
}
