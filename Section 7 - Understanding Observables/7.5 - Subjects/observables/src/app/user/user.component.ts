import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
   id: number;
   private activatedSubject: Subscription;

   constructor(private route: ActivatedRoute, private userService: UserService) {
   }

   ngOnInit() {
      this.activatedSubject = this.route.params.subscribe((params: Params) => {
         this.id = +params.id;
      });
   }

   ngOnDestroy() {
      this.activatedSubject.unsubscribe();
   }

   onActivate() {
      this.userService.activatedEmitter.next(true);
   }
}