import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor( private messageService: MessageService,
               private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

  //    let errors;

      try {
//        errors = errorResponse.error.json;
        // msg = errors[0].mensagemUsuario;
        msg = errorResponse.error.userMessage;

      } catch (e) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';
      }

      // msg = 'Ocorreu um erro ao processar a sua solicitação';

      if ( errorResponse.status === 403 ){
        msg = 'Você não tem permissão para executar essa ação';
      }

      // try {
      //   errors = errorResponse.error.json;
      //
      //   msg = errors[0].mensagemUsuario;
      //
      // } catch (e) {
      //
      // }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: 'Error', detail: msg});
  }

}
