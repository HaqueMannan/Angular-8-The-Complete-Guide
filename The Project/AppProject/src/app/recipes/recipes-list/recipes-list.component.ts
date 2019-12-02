import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
   selector: 'app-recipes-list',
   templateUrl: './recipes-list.component.html',
   styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
   recipes: Recipe[] = [];
   subscription: Subscription;

   constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.subscription = this.recipeService.recipeChanged.subscribe(
         (recipes: Recipe[]) => {
            this.recipes = recipes;
         }
      );
      this.recipes = this.recipeService.getRecipes();
   }

   onNewRecipe() {
      this.router.navigate(['new'], { relativeTo: this.route });
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}