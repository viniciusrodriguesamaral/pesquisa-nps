import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResultadoPesquisa} from "../../shared/model";
import {PesquisaService} from "../pesquisa.service";

@Component({
  selector: 'app-grafico-pesquisa',
  templateUrl: './grafico-pesquisa.component.html'
})
export class GraficoPesquisaComponent implements OnInit {
  @Input() resultadoPesquisa?: ResultadoPesquisa = new  ResultadoPesquisa();
  @Input() data?: any;

  @Output() actionBack      =   new EventEmitter<any>();
  // data: any;

  // resultadoPesquisa = new ResultadoPesquisa();  // resultadoPesquisa = new ResultadoPesquisa();
  // promotores: number;
  // neutros: number;
  // detratores: number;

  constructor(private pesquisaService: PesquisaService) { }

  ngOnInit(): void {
    // if (this.pesquisa.id){
    //   this.pesquisar(this.pesquisa.id);
    // }
  }

/*  buscarResultadoPesquisa(idPesquisa: number): void{
    this.pesquisaService.buscarResultadoPesquisa(idPesquisa)
      .then( resultadoPesquisa => {
        this.resultadoPesquisa = resultadoPesquisa;
        console.log(this.resultadoPesquisa);
        this.montaGrafico(this.resultadoPesquisa);
      })
      .catch();
  }

  montaGrafico(resultadoPesquisa: ResultadoPesquisa): void{
    this.promotores       = resultadoPesquisa.percPromotores;
    this.neutros          = resultadoPesquisa.percNeutros;
    this.detratores       = resultadoPesquisa.percDetratores;

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
  }*/

  sair(): void{
    this.actionBack.emit();
  }
}
