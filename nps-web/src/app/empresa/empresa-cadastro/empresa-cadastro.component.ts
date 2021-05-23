import { Component, OnInit } from '@angular/core';
import {Credencial, Empresa} from "../../shared/model";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {EmpresaService} from "../empresa.service";
import {FormControl} from "@angular/forms";
import {HomeService} from "../../home/home.service";
import {AbstractFormComponent} from "../../shared/abstract-form.component";
import {ErrorHandlerService} from "../../shared/error-handler.service";

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html'
})
export class EmpresaCadastroComponent extends AbstractFormComponent implements OnInit {

  empresa = new Empresa();
  token: string;
  credencial = new Credencial();

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private empresaService: EmpresaService,
              private homeService: HomeService,
              private errorHandle: ErrorHandlerService) { super(); }

  ngOnInit(): void {
    const idEmpresa = this.route.snapshot.params.id;

    this.credencial = this.homeService.getCredencial();

    this.title.setTitle('Nova empresa');

    if (idEmpresa){
      this.carregarEmpresa(idEmpresa);
    }
  }

  get TituloPagina(): string{
    return this.title.getTitle();
  }

  carregarEmpresa(idEmpresa: number): void{
    this.empresaService.buscarPorCodigo(idEmpresa)
      .then( empresa => {
        this.empresa = empresa;
        this.atualizarTituloEdicao();
      })
      .catch(  erro => this.errorHandle.handle(erro) );
  }

  get editando(): boolean{
    return Boolean(this.empresa.id);
  }

  salvar(form: FormControl): void{

    if (this.editando){
      this.atualizarEmpresa(form);
    }else{
      this.adicionarEmpresa(form);
    }
  }

  atualizarEmpresa(form: FormControl): void{
    this.empresaService.atualizar(this.empresa)
      .then( empresa => {
        this.empresa = empresa;
        this.router.navigate(['/empresa']);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Empresa atualizado com sucesso!'});
      })
      .catch( error => this.errorHandle.handle(error) );
  }

  adicionarEmpresa(form: FormControl): void{
    this.empresa.instituicao.id = this.credencial.idInstituicao;

    this.empresaService.adicionar(this.empresa)
      .then( empresaAdicionado => {
        this.router.navigate(['/empresa']);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Empresa cadastrada com sucesso!'});
      })
      .catch( error => this.errorHandle.handle(error) );
  }

  atualizarTituloEdicao(): void{
    this.title.setTitle(`Edição de Empresa`);
  }

}
