import { UserProfile } from "./user-profile.model";


export class Credentials {
    id: number;
    username: string;
    password: string;
    roles: string[];
    userProfile: string | UserProfile;
}