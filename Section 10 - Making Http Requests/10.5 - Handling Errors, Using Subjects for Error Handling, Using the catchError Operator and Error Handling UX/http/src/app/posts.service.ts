import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostsServices {
   error = new Subject<String>();

   constructor(private http: HttpClient) {}

   createAndStorePosts(title: string, content: string) {
      const postData: Post = { title: title, content: content };
      this.http.post<{ name: string }>(
         'https://angular-http-234fa.firebaseio.com/posts.json',
         postData
      ).subscribe(responseData => {
         console.log(responseData);
      }, error => {
         this.error.next(error.message);
      });
   }

   fetchPosts() {
      return this.http.get<{ [key: string]: Post }>(
         'https://angular-http-234fa.firebaseio.com/posts.json'
      ).pipe(
         map(responseData => {
            const postsArray: Post[] = [];
            for (const key in responseData) {
               if (responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key });
               }
            }
            return postsArray;
         }),
         catchError(errorRes => {
            //Send to some analytics server
            return throwError(errorRes);
         })
      )
   }

   deletePosts() {
      return this.http.delete('https://angular-http-234fa.firebaseio.com/posts.json')
   }
}