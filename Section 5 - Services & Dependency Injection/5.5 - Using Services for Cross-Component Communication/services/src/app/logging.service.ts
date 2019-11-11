import { Injectable, EventEmitter } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoggingService {
   logStatusChange(status: string) {
      console.log('A server status changed, new status: ' + status);
   }
}