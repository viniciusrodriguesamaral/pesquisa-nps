import { EventEmitter } from '@angular/core'

export class LoadingService {
    notifier = new EventEmitter<any>();
    constructor() { }

    show() {
        this.notifier.emit(true);
    }

    hide() {
        this.notifier.emit(false);
    }

}
