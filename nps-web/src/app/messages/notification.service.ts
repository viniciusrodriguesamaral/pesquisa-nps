import {EventEmitter} from '@angular/core';
import { TypeMessage } from './type-message';

export class NotificationService {
  notifier = new EventEmitter<any>();

  constructor() {}

  notify(type: TypeMessage, message: string): void {
    this.notifier.emit({type: type, message: message});
  }

}
