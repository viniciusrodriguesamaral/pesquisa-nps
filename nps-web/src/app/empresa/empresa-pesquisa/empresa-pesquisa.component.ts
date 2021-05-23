import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {EmpresaFilter, EmpresaService} from "../empresa.service";
import {Title} from "@angular/platform-browser";
import {EnumStatus} from "../../shared/status";
import {HomeService} from "../../home/home.service";
import {Credencial} from "../../shared/model";
import {ErrorHandlerService} from "../../shared/error-handler.service";

@Component({
  selector: 'app-empresa-pesquisa',
  templateUrl: './empresa-pesquisa.component.html'
})
export class EmpresaPesquisaComponent implements OnInit {
  totalRegistros        = 0;
  empresas              = [];
  filtro                = new EmpresaFilter();
  @ViewChild('tabela', {static: true}) grid: Table;

  credencial = new Credencial();

  constructor(private empresaService: EmpresaService,
              private route: ActivatedRoute,
              private confirmationservice: ConfirmationService,
              private router: Router,
              private title: Title,
              private messageService: MessageService,
              private homeService: HomeService,
              private errorHandle: ErrorHandlerService) { }

  ngOnInit(): void {
    this.credencial = this.homeService.getCredencial();

    this.filtro.criterio = '';
    this.title.setTitle('Pesquisa de empresas');

    if (this.credencial.token) {
      this.pesquisar(0);
    }
  }

  pesquisar(pagina = 0): void{
    this.filtro.pagina          = pagina;
    this.filtro.token     = this.credencial.token;

    this.empresaService.buscarEmpresasInstituicao( this.filtro )
      .then( resultado => {
        this.totalRegistros = resultado.total;

        this.empresas = resultado.empresas;
      })
      .catch(  erro => this.errorHandle.handle(erro) );
  }

  aoMudarPagina(event: LazyLoadEvent): void{
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  statusAtivo(status: string): boolean{
    return EnumStatus.ATIVO === status;
  }

  editar(idEmpresa: number): void{
    this.router.navigate(['/empresa/', idEmpresa], { skipLocationChange: true});
  }

  excluir(empresa: any): void{
    this.empresaService.excluir(empresa.id)
      .then( () => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Empresa excluida com sucesso!' });
        this.grid.reset();
      })
      .catch( erro => this.errorHandle.handle(erro) );
  }

  confirmaExclusao(empresa: any): void{
    this.confirmationservice.confirm({
      message: 'Deseja excluir a empresa?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(empresa);
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Informação', detail: 'Exclusão cancelada!'});
      }
    });
  }

  alternarStatus(empresa: any ): void{
    const novoStatus = EnumStatus.ATIVO === empresa.status;

    this.empresaService.mudarStatus(empresa.id, !novoStatus)
      .then(() => {
        const acao = !novoStatus ? 'ativada' : 'desativada';

        empresa.ativo = !novoStatus;

        this.grid.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Empresa ${acao} com sucesso!`});

      })
      .catch( erro => this.errorHandle.handle(erro)  );
  }

  get TituloPagina(): string{
    return this.title.getTitle();
  }

}
