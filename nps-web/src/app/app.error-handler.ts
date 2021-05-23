// import { Response } from '@angular/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
//import { LoginService } from 'app/security/login/login.service'; TODO
import { NotificationService } from './shared/messages/notification.service';
import { TypeMessage } from './shared/messages/type-message';

declare function escape( s:string ): string;

@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zone: NgZone) {
    super();
  }

  handleError(errorResponse: Response | any) {
    if (errorResponse === 'invalid_grant'){
      this.ns.notify(TypeMessage.WARN, 'Usuário ou senha inválidos.');
    }
    this.zone.run(() => {
      switch (errorResponse.status) {
        case 0:
          this.ns.notify(TypeMessage.WARN, 'Conexão recusada. Verifique sua internet.');
          break;
        case 400:
          this.businessException(errorResponse);
        break;
        case 403:
          this.ns.notify(TypeMessage.WARN, 'Você não possui autorização para acessar este recurso.');
        break;
        case 404:
          this.ns.notify(TypeMessage.WARN, 'Recurso não encontrado');
        break;
        case 422:
          this.businessException(errorResponse);
        break;
        case 500:
        this.ns.notify(TypeMessage.ERROR, 'Erro Interno. Entre em contato com o Administrador do Sistema.');
        break;
      }
    });

    super.handleError(errorResponse);
  }

  businessException(response: any) {
    let error = '';

    let validation = this.toJSON(response.error);

    if (response.error instanceof ArrayBuffer) {
      let value: string = String.fromCharCode.apply(null, new Uint8Array(response.error));
      validation = JSON.parse(decodeURIComponent(escape(value)));
    }

    if (validation.messages) {
      for (let msg of validation.messages) {
        error += msg.message;
        error += '<br>'
      }
    } else if (validation.error_description) {
      error = validation.error_description;
    }

    if (error != '') {
      this.ns.notify(TypeMessage.ERROR, error);
    }
  }

  toJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
  }

}
