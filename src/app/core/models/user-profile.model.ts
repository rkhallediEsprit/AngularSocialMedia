import { Attachment } from "./attachment.model";
import { Comment } from "./comment.model";
import { Credentials } from "./credentials.model";
import { Post } from "./post.model";


export class UserProfile {
    id: number;
    name: string;
    surname: string;
    category: string;
    dateOfBirth: string;
    gender: string;
    phoneNumber: string;
    emailAddress: string;
    address: string;
    bio: string;
    profilePicture: string;
    isActive: boolean;
    posts: string[] | Post[];
    attachments: string[] | Attachment[];
    comments: string[] | Comment[];
    events: string[] | Event[];
    eventsParticipatedIn: string[];
    credential: string | Credentials
}