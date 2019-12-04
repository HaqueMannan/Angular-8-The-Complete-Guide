import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
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
         postData,
         {
            observe: 'response'
         }
      ).subscribe(responseData => {
         console.log(responseData.body);
      }, error => {
         this.error.next(error.message);
      });
   }

   fetchPosts() {
      let searchParams = new HttpParams()
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');

      return this.http.get<{ [key: string]: Post }>(
         'https://angular-http-234fa.firebaseio.com/posts.json',
         {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            params: searchParams
         }
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
      return this.http.delete(
         'https://angular-http-234fa.firebaseio.com/posts.json',
         {
            observe: 'events',
            responseType: 'text'
         }
      ).pipe(tap(event => {
         console.log(event);
         if (event.type === HttpEventType.Sent) {
            // ...
         }
         if (event.type === HttpEventType.Response) {
            console.log(event.body);
         }
      }));
   }
}