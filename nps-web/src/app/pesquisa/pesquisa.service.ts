import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Empresa, Pesquisa, Resultado, ResultadoPesquisa} from "../shared/model";
import {EmpresaFilter} from "../empresa/empresa.service";

export class PesquisaFilter{
  id: string;
  dataInicio: Date;
  dataFim: Date;
  idEmpresa: number;
  empresa = new Empresa();

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  pesquisaUrl: string;
  instituicaoUrl: string;

  constructor(private http: HttpClient) {
    this.pesquisaUrl = `${environment.apiUrl}/pesquisa`;
    this.instituicaoUrl = `${environment.apiUrl}/instituicao`;
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete( `${this.pesquisaUrl}/${codigo}` )
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'Application/json');

    return this.http.put(`${this.pesquisaUrl}/${codigo}/ativo`, ativo, {headers})
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(idPesquisa: number): Promise<Pesquisa> {
    let params = new HttpParams();

    params = params.append('id', String(idPesquisa));

    return this.http.get(`${this.pesquisaUrl}/obter`, {params})
      .toPromise()
      .then(response => {
        const pesquisa = response as Pesquisa;
        return pesquisa;
      });
  }

  adicionar(pesquisa: Pesquisa): Promise<Pesquisa> {
    return this.http.post<Pesquisa>(`${this.pesquisaUrl}`, pesquisa)
      .toPromise();
  }

  atualizar(pesquisa: Pesquisa): Promise<Pesquisa> {
    return this.http.put<Pesquisa>(`${this.pesquisaUrl}/${pesquisa.id}`, pesquisa)
      .toPromise()
      .then(response => {
        const pesquisaAlterada = response  as Pesquisa;
        return pesquisaAlterada;
      });
  }

  buscarPesquisasEmpresa(filtro: PesquisaFilter): Promise<any>{
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', filtro.pagina.toString());
    httpParams = httpParams.set('size', filtro.itensPorPagina.toString());
    httpParams = httpParams.set('idEmpresa', String(filtro.idEmpresa));

    // TODO - Habilitar

    const options = { params: httpParams, headers: httpHeaders };

    return this.http.get(`${this.pesquisaUrl}/buscarPesquisasDaEmpresa/`, options )
      .toPromise()
      .then(response => {
        const pesquisas = response['content'];
        const resultado = {
          pesquisas,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  enviarResposta(resultado: Resultado ): Promise<Resultado>{
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<Resultado>(  `${this.pesquisaUrl}/enviarPesquisa` , resultado, {headers})
      .toPromise();
  }

  buscarPesquisa(token: string): Promise<Pesquisa>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(`${this.pesquisaUrl}/buscarPesquisaPorToken/${token}`, {headers} )
      .toPromise()
      .then( response => {
        const pesquisa = response as Pesquisa;
        return pesquisa;
      });
  }

  buscarResultadoPesquisa(idPesquisa: number): Promise<ResultadoPesquisa>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(`${this.pesquisaUrl}/buscarResultadoPesquisa/${idPesquisa}`, {headers} )
      .toPromise()
      .then( response => {
        const resultadoPesquisa = response as ResultadoPesquisa;
        return resultadoPesquisa;
      });
  }

}
