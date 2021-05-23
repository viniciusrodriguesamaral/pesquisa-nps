import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaPesquisaComponent} from "./lista-pesquisa/lista-pesquisa.component";
import {PesquisaCadastroComponent} from "./pesquisa-cadastro/pesquisa-cadastro.component";

const routes: Routes = [
  {
    path: 'pesquisas',
    component: ListaPesquisaComponent
  },
  {
    path: 'novaPesquisa',
    component: PesquisaCadastroComponent
  },
  { path: 'editarPesquisa/:id',
    component: PesquisaCadastroComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PesquisaRoutingModule { }
