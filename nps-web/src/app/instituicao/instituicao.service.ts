import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Credencial, HomeEstatisticaDTO, Instituicao} from "../shared/model";

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  instituicaoUrl: string;

  constructor(private http: HttpClient)  {
    this.instituicaoUrl = `${environment.apiUrl}/instituicao`;
  }

  buscaInstituicaoPorToken(token: string): Promise<Credencial> {
    return this.http.get( `${this.instituicaoUrl}/buscaInstituicaoPorToken/${token}` )
      .toPromise()
      .then( response => {
        const credencial = response as Credencial;
        return credencial;
      });
  }

  buscaEstatiticaHomePorToken(token: string): Promise<HomeEstatisticaDTO> {
    return this.http.get( `${this.instituicaoUrl}/buscaEstatiticaHomePorToken/${token}` )
      .toPromise()
      .then( response => {
        const homeEstatisticaDTO = response as HomeEstatisticaDTO;
        return homeEstatisticaDTO;
      });
  }

}
