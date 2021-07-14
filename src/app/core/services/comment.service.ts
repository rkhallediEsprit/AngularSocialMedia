import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';

const BASE_PATH = environment.baseBath;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_PATH}/comments`);
  }


  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${BASE_PATH}/comments/${id}`);
  }


  createComments(post: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${BASE_PATH}/comments`, post);
  }


  updateComments(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${BASE_PATH}/comments/${id}`, comment);
  }

  
  deleteComments(id: number): Observable<any> {
    return this.http.delete(`${BASE_PATH}/comments/${id}`);
  }
}
