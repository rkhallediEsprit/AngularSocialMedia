import { UserProfile } from "./user-profile.model";

export class Event {
  id: number;
  eventName: string;
  dateOfEvent: string;
  location: string;
  description: string;
  eventPicture: string;
  userProfile: UserProfile;
  participants?: string[] | UserProfile[];
}
