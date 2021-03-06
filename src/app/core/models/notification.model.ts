import { Event } from "./event.model";

export class Notification{
    id?: number;
    creationDate : Date;
    event : Event | string;
    readed?: boolean;
}