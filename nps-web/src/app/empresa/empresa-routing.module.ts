import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmpresaPesquisaComponent} from "./empresa-pesquisa/empresa-pesquisa.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaPesquisaComponent
  },
  {
    path: 'empresa/novo',
    component: EmpresaCadastroComponent
  },
  { path: 'empresa/:id',
    component: EmpresaCadastroComponent
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
export class EmpresaRoutingModule { }
