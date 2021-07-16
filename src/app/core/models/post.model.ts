import { Comment } from "./comment.model";
import { UserProfile } from "./user-profile.model";


export class Post {
    id: number;
    description: string;
    dateOfPublishing: Date;
    userProfile: string | UserProfile;
    filePath: string;
    comments: string[] | Comment[];
}