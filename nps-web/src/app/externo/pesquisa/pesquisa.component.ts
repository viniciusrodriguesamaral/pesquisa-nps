import { Component, OnInit } from '@angular/core';
import {PesquisaService} from "../../pesquisa/pesquisa.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pesquisa, Resultado} from "../../shared/model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html'
})
export class PesquisaComponent implements OnInit {

  pesquisa = new Pesquisa();
  resultado = new Resultado();

  mostrarPesquisa: boolean;
  pesquisaEnviaSucesso: boolean;
  pesquisaNaoEncontrada: boolean;

  msgs = [];

  constructor(private pesquisaService: PesquisaService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {

  }

  ngOnInit(): void {

    const token = this.route.snapshot.params.token;

    this.mostrarPesquisa = false;

    if (token) {
      this.buscarPesquisaPorToken(token);
    }
  }

  buscarPesquisaPorToken(token: string): void{
    this.pesquisaService.buscarPesquisa(token)
      .then( pesquisa => {
        this.pesquisa = pesquisa;

        if (this.pesquisa.id){
          this.mostrarPesquisa = true;
        }else{
          this.pesquisaNaoEncontrada = true;
        }

      })
      .catch(erro => this.pesquisaNaoEncontrada = true);
  }

  enviarResposta(): void{
    this.resultado.pesquisa = this.pesquisa;
    this.resultado.data = new Date();

    this.pesquisaService.enviarResposta(this.resultado)
      .then( resultado => {
        // this.messageService.add({severity: 'info', summary: 'Informação', detail: 'Sua pesquisa foi enviado com sucesso.'});
        // this.router.navigate(['/clinica/agente/pesquisar']);
        // this.resultado = resultado;
        this.mostrarPesquisa = false;
        this.pesquisaEnviaSucesso = true;
      });
  }

}
