import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   servers;                  // Solution to error - assign/initialise with a value i.e. servers = [];
   //  servers = [];          // Uncomment me to test the second bug for onRemoveServer

   onAddServer() {
      this.servers.push('Another Server');
   }

   // Logical error do not show up in the console as an error message.
   onRemoveServer(id: number) {
      const position = id + 1;               // issue of adding +1 prevents last items from being removed.
      this.servers.splice(position, 1);
   }
}