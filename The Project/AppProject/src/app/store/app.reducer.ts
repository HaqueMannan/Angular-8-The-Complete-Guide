import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';

export interface AppState {
   shoppingList: fromShoppingList.State;
   auth: fromAuth.State;
   recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
   auth: fromAuth.authReducer,
   shoppingList: fromShoppingList.shoppingListReducer,
   recipes: fromRecipes.recipeReducer
};