import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-servers',
   // selector: '[app-servers]',
   // selector: '.app-servers',
     templateUrl: './servers.component.html',
   // template: `
   // <app-server></app-server>
   // <app-server></app-server>
   // `,
   styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
   allowNewServer = false;
   serverCreationStatus = 'No server was created!';
   serverName = 'Test';
   serverCreated = false;
   servers = ['TestServer', 'LiveServer'];

   constructor() {
      setTimeout(() => {
         this.allowNewServer = true;
      }, 2000);
   }

   ngOnInit() {
   }

   onCreateServer() {
      this.serverCreated = true;
      this.servers.push(this.serverName);
      this.serverCreationStatus = `Server was created! Server Name is ${this.serverName}`;
   }

   onUpdateServerName(event: Event) {
      // console.log(event);
      this.serverName = (<HTMLInputElement>event.target).value;
   }
}