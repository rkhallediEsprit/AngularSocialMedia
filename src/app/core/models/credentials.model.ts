import { UserProfile } from "./user-profile.model";


export class Credentials {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    userProfile: string | UserProfile
}