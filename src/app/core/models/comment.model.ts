import { Post } from "./post.model";
import { UserProfile } from "./user-profile.model";


export class Comment {
    id: number;
    content: string;
    dateOfComment: string;
    userProfile: string | UserProfile;
    post: string | Post;
}