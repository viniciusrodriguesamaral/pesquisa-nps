import { Component, OnInit } from '@angular/core';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { NotificationService } from '../messages/notification.service';
import { TypeMessage } from '../messages/type-message';
import {Message, MessageService} from 'primeng';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  msgs: Message[] = [];

  constructor(private notificationService: NotificationService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.notificationService.notifier
      .subscribe(ms => {
        this.exibirMensagem(ms.type, ms.message);
      })
  }

  exibirMensagem(severity: string, msg: string) {
    this.msgs = [];
    let summary = '';
    switch (severity) {
      case TypeMessage.INFO:
        summary = 'Informação'
        break;
      case TypeMessage.WARN:
        summary = 'Aviso'
        break;
      case TypeMessage.SUCCESS:
        summary = 'Sucesso'
        break;
      case TypeMessage.ERROR:
        summary = 'Erro'
        break;
    }
    this.messageService.add({severity: severity, summary: summary, detail:msg});
  }

}
