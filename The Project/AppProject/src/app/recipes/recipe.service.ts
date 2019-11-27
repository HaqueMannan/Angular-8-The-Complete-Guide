import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
   private recipes: Recipe[] = [
      new Recipe(
         'Steak and salad',
         'A big juicy steak with a side of health green salad.',
         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
         [
            new Ingredient('Sirloin Steak', 1),
            new Ingredient('Lettuce', 1),
            new Ingredient('Tomato', 1),
            new Ingredient('Yellow Peppers', 1)
         ]
      ),
      new Recipe(
         'Lamb chops & mediterranean salad',
         'Another super recipe that is a must try.',
         'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
         [
            new Ingredient('Lamb Chops', 5),
            new Ingredient('Red Chilli', 2),
            new Ingredient('Red Onions', 1),
            new Ingredient('Salad Dressing', 1),
         ]
      )
   ];

   constructor(private shoppingListService: ShoppingListService) {
   }

   getRecipes() {
      return this.recipes.slice();
   }

   getRecipe(index: number) {
      return this.recipes[index];
   }

   addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
   }
}