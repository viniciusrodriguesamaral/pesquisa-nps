import { Injectable } from '@angular/core';
import {Credencial} from "../shared/model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  key = 'ACESSO-INSTITUICAO';
  credencial = new Credencial();

  constructor() { }

  setCredencial(credencial: Credencial): void {
    this.setCookie(this.key, credencial);
  }

  setCookie(key: string, item: any): void {
    localStorage.setItem(key, btoa(JSON.stringify(item)));
  }

  getCookie(key: string): any {
    const value = localStorage.getItem(key);

    try {
      return JSON.parse(atob(value));
    } catch (e) { }

    return undefined;
  }

  getCredencial(): Credencial {
    if (!this.credencial.idInstituicao) {
      this.credencial = this.getCookie(this.key);
    }
    return this.credencial;
  }
}
