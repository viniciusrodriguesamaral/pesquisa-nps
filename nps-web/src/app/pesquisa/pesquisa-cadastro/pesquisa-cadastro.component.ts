import { Component, OnInit } from '@angular/core';
import {Credencial, Empresa, Pesquisa} from "../../shared/model";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {EmpresaService} from "../../empresa/empresa.service";
import {HomeService} from "../../home/home.service";
import {PesquisaService} from "../pesquisa.service";
import {FormControl} from "@angular/forms";
import {AbstractFormComponent} from "../../shared/abstract-form.component";
import {ErrorHandlerService} from "../../shared/error-handler.service";

@Component({
  selector: 'app-pesquisa-cadastro',
  templateUrl: './pesquisa-cadastro.component.html'
})
export class PesquisaCadastroComponent extends AbstractFormComponent implements OnInit {
  pesquisa            = new Pesquisa();
  credencial          = new Credencial();

  listaEmpresa: Empresa[] = [];

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private pesquisaService: PesquisaService,
              private homeService: HomeService,
              private empresaService: EmpresaService,
              private errorHandle: ErrorHandlerService) { super(); }

  ngOnInit(): void {
    const idPesquisa = this.route.snapshot.params.id;

    this.pesquisa.id = 0;

    this.credencial = this.homeService.getCredencial();

    this.title.setTitle('Nova Pesquisa');

    if (idPesquisa){
      this.carregarPesquisa(idPesquisa);
    }
  }

  get TituloPagina(): string{
    return this.title.getTitle();
  }

  carregarPesquisa(idPesquisa: number): void{
    this.pesquisaService.buscarPorCodigo(idPesquisa)
      .then( pesquisa => {
        this.pesquisa = pesquisa;
        this.atualizarTituloEdicao();
      })
      .catch( error => this.errorHandle.handle(error)  );
  }

  get editando(): boolean{
    return Boolean(this.pesquisa.id);
  }

  salvar(form: FormControl): void{
    if (this.editando){
      this.atualizarPesquisa(form);
    }else{
      this.adicionarPesquisa(form);
    }
  }

  atualizarPesquisa(form: FormControl): void{
    this.pesquisaService.atualizar(this.pesquisa)
      .then( pesquisa => {
        this.pesquisa = pesquisa;
        // this.router.navigate(['/pesquisas']);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pesquisa atualizado com sucesso!'});
      })
      .catch( error => this.errorHandle.handle(error)  );
  }

  adicionarPesquisa(form: FormControl): void{
    this.pesquisaService.adicionar(this.pesquisa)
      .then( pesquisaAdicionado => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pesquisa cadastrada com sucesso!'});
      })
      .catch( error => this.errorHandle.handle(error) );
  }

  atualizarTituloEdicao(): void{
    this.title.setTitle(`Edição de Pesquisa`);
  }

  pesquisaEmpresa(event): void{
    const query = event.query;
    if (!query) {
      return;
    }

    this.empresaService.obterPorRazaoOrFantasiaOrRegistro(query, this.credencial.idInstituicao)
      .then((listaEmpresa: Empresa[]) => {
        this.listaEmpresa = listaEmpresa;

      })
      .catch( error => this.errorHandle.handle(error) );
  }

}
