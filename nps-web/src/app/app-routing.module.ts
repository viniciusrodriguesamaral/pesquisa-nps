import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {EmpresaRoutingModule} from "./empresa/empresa-routing.module";
import {PesquisaRoutingModule} from "./pesquisa/pesquisa-routing.module";
import {ExternoRoutingModule} from "./externo/externo-routing.module";
import {PaginaNaoEncontradaComponent} from "./layout/pagina-nao-encontrada/pagina-nao-encontrada.component";
import {HomeComponent} from "./home/home/home.component";

const routes: Routes = [
  {
    path: 'home/:token',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: PaginaNaoEncontradaComponent
  },
  { path: '**' , component: PaginaNaoEncontradaComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    EmpresaRoutingModule,
    PesquisaRoutingModule,
    ExternoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
