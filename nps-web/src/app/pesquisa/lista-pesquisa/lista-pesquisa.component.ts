import {Component, OnInit, ViewChild} from '@angular/core';
import {PesquisaFilter, PesquisaService} from '../pesquisa.service';
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Credencial, Empresa, Pesquisa, ResultadoPesquisa} from '../../shared/model';
// @ts-ignore
import {Title} from '@angular/platform-browser';
import {HomeService} from '../../home/home.service';
import {EnumStatus} from '../../shared/status';
import {environment} from '../../../environments/environment';
import {EmpresaService} from '../../empresa/empresa.service';
import {ErrorHandlerService} from "../../shared/error-handler.service";

// @ts-ignore
@Component({
  selector: 'app-lista-pesquisa',
  templateUrl: './lista-pesquisa.component.html'
})
export class ListaPesquisaComponent implements OnInit {
  totalRegistros        = 0;
  pesquisas             = [];
  filtro                = new PesquisaFilter();
  @ViewChild('tabela', {static: true}) grid: Table;

  credencial = new Credencial();
  listaEmpresa: Empresa[] = [];

  urlPesquisa: string;

  resultadoPesquisa = new ResultadoPesquisa();
  exibindoFormularioGrafico: boolean;
  pesquisa = new Pesquisa();

  promotores: number;
  neutros: number;
  detratores: number;
  data: any = [];

  constructor(private pesquisaService: PesquisaService,
              private route: ActivatedRoute,
              private confirmationservice: ConfirmationService,
              private router: Router,
              private title: Title,
              private messageService: MessageService,
              private homeService: HomeService,
              private empresaService: EmpresaService,
              private errorHandle: ErrorHandlerService) { }

  ngOnInit(): void {
    this.credencial = this.homeService.getCredencial();

    this.urlPesquisa = `${environment.CONTEXTO}/enviarPesquisa/`;

    this.title.setTitle('Listagem de pesquisas');
  }

  pesquisar(pagina = 0): void{

    if (!this.filtro.empresa?.id){
      return;
    }

    this.filtro.pagina          = pagina;
    this.filtro.idEmpresa       = this.filtro.empresa.id;

    this.pesquisaService.buscarPesquisasEmpresa( this.filtro )
      .then( resultado => {
        this.totalRegistros = resultado.total;

        this.pesquisas = resultado.pesquisas;
      })
      .catch( erro => this.errorHandle.handle(erro) );
  }

  aoMudarPagina(event: LazyLoadEvent): void{
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  statusAtivo(status: string): boolean{
    return EnumStatus.ATIVO === status;
  }

  editar( idPesquisa: number ): void{
    this.router.navigate(['/editarPesquisa/', idPesquisa], { skipLocationChange: true});
  }

  excluir(pesquisa: any): void{
    this.pesquisaService.excluir(pesquisa.id)
      .then( () => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Pesquisa excluida com sucesso!' });
        this.grid.reset();
      })
      .catch( erro => this.errorHandle.handle(erro) );
  }

  confirmaExclusao(pesquisa: any): void{
    this.confirmationservice.confirm({
      message: 'Deseja excluir a pesquisa?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(pesquisa);
      },
      reject: () => {
        this.messageService.add({severity: 'info', summary: 'Informação', detail: 'Exclusão cancelada!'});
      }
    });
  }

  alternarStatus(pesquisa: any ): void{
    const novoStatus = EnumStatus.ATIVO === pesquisa.status;

    this.pesquisaService.mudarStatus(pesquisa.id, !novoStatus)
      .then(() => {
        const acao = !novoStatus ? 'ativado' : 'desativado';

        pesquisa.ativo = !novoStatus;

        this.grid.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Pesquisa ${acao} com sucesso!`});

      })
      .catch( erro => this.errorHandle.handle(erro)  );
  }

  get TituloPagina(): string{
    return this.title.getTitle();
  }

  copyToClipboard(link: string): void {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.urlPesquisa.concat(link);
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Copiado para a área de transferência`});
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
      .catch(  error => this.errorHandle.handle(error) );
  }

  fecharGrafico(): void{
    this.exibindoFormularioGrafico = false;
  }

  mostrarResultado(pesquisa: Pesquisa): void{
    this.pesquisa = pesquisa;
    this.buscarResultadoPesquisa(this.pesquisa.id);
    this.exibindoFormularioGrafico = true;
  }

  buscarResultadoPesquisa(idPesquisa: number): void{
    this.pesquisaService.buscarResultadoPesquisa(idPesquisa)
      .then( resultadoPesquisa => {
        this.resultadoPesquisa = resultadoPesquisa;
        console.log(idPesquisa);
        console.log(this.resultadoPesquisa);
        this.montaGrafico(this.resultadoPesquisa);
      })
      .catch();
  }

  montaGrafico(resultadoPesquisa: ResultadoPesquisa): void{
    this.promotores     =   resultadoPesquisa.percPromotores;
    this.neutros        =   resultadoPesquisa.percNeutros;
    this.detratores     =   resultadoPesquisa.percDetratores;

    this.data = {
      labels: ['Promotores', 'Neutros', 'Detratores'],
      datasets: [
        {
          data: [ this.promotores, this.neutros, this.detratores],
          backgroundColor: [
            "#38a907",
            "#e0b20d",
            "#ea132c"
          ],
          hoverBackgroundColor: [
            "#38a907",
            "#e0b20d",
            "#ea132c"
          ]
        }]
    };
  }

}
