import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { Post } from './post.model';
import { PostsServices } from './posts.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
   loadedPosts: Post[] = [];
   isFetching = false;
   error = null;
   private errorSub: Subscription;

   constructor(private http: HttpClient, private postsService: PostsServices) {}

   ngOnInit() {
      this.errorSub = this.postsService.error.subscribe(errorMessage => {
         this.error = errorMessage;
      });

      this.isFetching = true;
      this.postsService.fetchPosts().subscribe(posts => {
         this.isFetching = false;
         this.loadedPosts = posts;
      }, error => {
         this.isFetching = false;
         this.error = error.message;
      });
   }

   onCreatePost(postData: Post) {
      // Send Http request
      this.postsService.createAndStorePosts(postData.title, postData.content);
   }

   onFetchPosts() {
      // Send Http request
      this.isFetching = true;
      this.postsService.fetchPosts().subscribe(posts => {
         this.isFetching = false;
         this.loadedPosts = posts
      }, error => {
         this.isFetching = false;
         this.error = error.message;
      });
   }

   onClearPosts() {
      // Send Http request
      this.postsService.deletePosts().subscribe(() => {
         this.loadedPosts = [];
      });
   }

   onHandleError() {
      this.error = null;
   }

   ngOnDestroy() {
      this.errorSub.unsubscribe();
   }
}