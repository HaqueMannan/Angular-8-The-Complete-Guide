import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';

@Component({
   selector: 'app-recipes-detail',
   templateUrl: './recipes-detail.component.html',
   styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
   recipe: Recipe;
   id: number;

   constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

   ngOnInit() {
      // Method:
      // this.route.params.subscribe(
      //    (params: Params) => {
      //       this.id = +params['id'];
      //       // this.recipe = this.recipeService.getRecipe(this.id);
      //       this.store.select('recipes').pipe(
      //          map(recipesState => {
      //             return recipesState.recipes.find((recipe, index) => {
      //                return index === this.id
      //             });
      //          })
      //       ).subscribe(recipe => {
      //          this.recipe = recipe;
      //       });
      //    }
      // );

      // Alt Method:
      this.route.params.pipe(
         map(params => {
            return +params['id'];
         }),
         switchMap(id => {
            this.id = id;
            return this.store.select('recipes');
         }),
         map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
               return index === this.id
            });
         })
      ).subscribe(recipe => {
         this.recipe = recipe;
      });
   }

   onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
   }

   onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.route });
   }

   onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
   }
}