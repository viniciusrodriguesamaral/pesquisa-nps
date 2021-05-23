import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../home.service";
import {InstituicaoService} from "../../instituicao/instituicao.service";
import {Credencial, HomeEstatisticaDTO} from "../../shared/model";
import {Title} from "@angular/platform-browser";

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  homeEstatisticaDTO = new HomeEstatisticaDTO();
  credencial = new Credencial();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private homeService: HomeService,
              private instituicaoService: InstituicaoService) { }

  ngOnInit(): void {
    const token = this.route.snapshot.params.token;

    this.title.setTitle('Home');

    console.log('entrou home');
    console.log(token);

    if (token) {
      this.instituicaoService.buscaInstituicaoPorToken(token)
        .then(result => {
          this.credencial = result;
          if (this.credencial.idInstituicao) {
            this.homeService.setCredencial(this.credencial);
          }
        });

      this.carregarHomeInstituicao(token);
    }else {
      this.credencial = this.homeService.getCredencial();

      if (this.credencial.token) {
        this.carregarHomeInstituicao(this.credencial.token);
      }
    }

  }

  get TituloPagina(): string{
    return this.title.getTitle();
  }

  carregarHomeInstituicao(token: string): void{
    this.instituicaoService.buscaEstatiticaHomePorToken(token)
      .then(result => {
        this.homeEstatisticaDTO = result;
      });
  }

}
