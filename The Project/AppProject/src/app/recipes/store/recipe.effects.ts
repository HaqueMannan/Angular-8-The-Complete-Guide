import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipe.actions';

@Injectable()
export class RecipeEffects {
   @Effect()
   fetchRecipes = this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
         return this.http.get<Recipe[]>(
            'https://angular-http-234fa.firebaseio.com/recipes.json'
         )
      }),
      map(recipes => {
         return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
         });
      }),
      map(recipes => {
         return new RecipesActions.SetRecipes(recipes);
      })
   );

   constructor(private actions$: Actions, private http: HttpClient) {}
}