import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
   selector: 'app-recipes-detail',
   templateUrl: './recipes-detail.component.html',
   styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
   recipe: Recipe;
   id: number;

   constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

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
      this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
   }

   onEditRecipe() {
      this.router.navigate(['edit'], { relativeTo: this.route });
   }

   onDeleteRecipe() {
      this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
      this.router.navigate(['/recipes']);
   }
}