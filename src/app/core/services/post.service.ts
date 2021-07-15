import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

const BASE_PATH = environment.baseBath;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_PATH}/posts`);
  }


  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${BASE_PATH}/posts/${id}`);
  }


  createPosts(post: Post): Observable<Post> {
    return this.http.post<Post>(`${BASE_PATH}/posts`, post);
  }


  updatePosts(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${BASE_PATH}/posts/${id}`, post);
  }


  deletePosts(id: number): Observable<any> {
    return this.http.delete(`${BASE_PATH}/posts/${id}`);
  }


  fileUpload(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('attachment', file, file.name);
    return this.http.post<any>(`${BASE_PATH}/uploadFile`, fd, { reportProgress: true, observe: 'events' });
  }
}
