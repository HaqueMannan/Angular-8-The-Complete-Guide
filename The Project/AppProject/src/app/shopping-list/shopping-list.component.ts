import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
   selector: 'app-shopping-list',
   templateUrl: './shopping-list.component.html',
   styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
   ingredients: Observable <{ ingredients: Ingredient[] }>;
   // private ingredientChangeSubject: Subscription;

   constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

   ngOnInit() {
      this.ingredients = this.store.select('shoppingList');
      // this.ingredientChangeSubject = this.store.select('shoppingList').subscribe();

      // this.ingredients = this.shoppingListService.getIngredients();
      // this.ingredientChangeSubject = this.shoppingListService.ingredientsChanged
      //    .subscribe(
      //       (ingredients: Ingredient[]) => {
      //          this.ingredients = ingredients;
      //       }
      //    );

      this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!')
   }

   onEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
   }

   ngOnDestroy() {
      // this.ingredientChangeSubject.unsubscribe();
   }
}