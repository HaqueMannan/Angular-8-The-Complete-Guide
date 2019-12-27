import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';

@Component({
   selector: 'app-recipes-list',
   templateUrl: './recipes-list.component.html',
   styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
   recipes: Recipe[] = [];
   subscription: Subscription;

   constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

   ngOnInit() {
      this.subscription = this.store.select('recipes')
         .pipe(map(recipesState => recipesState.recipes))
         .subscribe((recipes: Recipe[]) => { this.recipes = recipes; });
   }

   onNewRecipe() {
      this.router.navigate(['new'], { relativeTo: this.route });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}