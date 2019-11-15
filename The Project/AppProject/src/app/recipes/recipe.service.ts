import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
   recipeSelected = new EventEmitter<Recipe>();

   private recipes: Recipe[] = [
      new Recipe('Test Recipe', 'This is a test recipe', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
      new Recipe('Another Test Recipe', 'This is another test recipe', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg')
   ];

   getRecipes() {
      return this.recipes.slice();
   }
}