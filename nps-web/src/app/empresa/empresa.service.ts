import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Empresa} from "../shared/model";

export class EmpresaFilter{
  criterio: string;
  idInstituicao: string;
  token: string;

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresaUrl: string;

  constructor(private http: HttpClient) {
    this.empresaUrl = `${environment.apiUrl}/empresa`;
  }

  buscarEmpresasInstituicao(filtro: EmpresaFilter): Promise<any>{
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', filtro.pagina.toString());
    httpParams = httpParams.set('size', filtro.itensPorPagina.toString());
    httpParams = httpParams.set('token', filtro.token);
    httpParams = httpParams.set('criterio', filtro.criterio);

    const options = { params: httpParams, headers: httpHeaders };

    return this.http.get(`${this.empresaUrl}/buscarEmpresasDaInstituicao/`, options )
      .toPromise()
      .then(response => {
        const empresas = response['content'];
        const resultado = {
          empresas,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete( `${this.empresaUrl}/${codigo}` )
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'Application/json');

    return this.http.put(`${this.empresaUrl}/${codigo}/ativo`, ativo, {headers})
      .toPromise()
      .then(() => null);
  }

  buscarPorCodigo(idEmpresa: number): Promise<Empresa> {
    let params = new HttpParams();

    params = params.append('id', String(idEmpresa));

    return this.http.get(`${this.empresaUrl}/obter`, {params})
      .toPromise()
      .then(response => {
        const empresa = response as Empresa;
        return empresa;
      });
  }

  adicionar(empresa: Empresa): Promise<Empresa> {
    return this.http.post<Empresa>(`${this.empresaUrl}`, empresa)
      .toPromise();
  }

  atualizar(empresa: Empresa): Promise<Empresa> {
    return this.http.put<Empresa>(`${this.empresaUrl}/${empresa.id}`, empresa)
      .toPromise()
      .then(response => {
        const empresaAlterada = response  as Empresa;
        return empresaAlterada;
      });
  }

  obterPorRazaoOrFantasiaOrRegistro(pesquisa: string, idInstituicao: number): Promise<Empresa[]>{
    let params      = new HttpParams();

    params          = params.set('criterio', pesquisa );
    params          = params.set('idInstituicao', String(idInstituicao) );

    console.log(params);

    return this.http.get<Empresa[]>( `${this.empresaUrl}/obterPorRazaoOrFantasia`, {params} )
      .toPromise()
      .then( response => response);
  }

}
