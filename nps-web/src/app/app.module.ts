import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {PaginaNaoEncontradaComponent} from "./layout/pagina-nao-encontrada/pagina-nao-encontrada.component";
import {PesquisaCadastroComponent} from "./pesquisa/pesquisa-cadastro/pesquisa-cadastro.component";
import {EmpresaPesquisaComponent} from "./empresa/empresa-pesquisa/empresa-pesquisa.component";
import {EmpresaCadastroComponent} from "./empresa/empresa-cadastro/empresa-cadastro.component";
import {HomeComponent} from "./home/home/home.component";
import {ListaPesquisaComponent} from "./pesquisa/lista-pesquisa/lista-pesquisa.component";
import {AdmAsideComponent} from "./layout/adm-nps/adm-aside/adm-aside.component";
import {AdmFooterComponent} from "./layout/adm-nps/adm-footer/adm-footer.component";
import {AdmHeaderComponent} from "./layout/adm-nps/adm-header/adm-header.component";
import {AdmHeaderDetailComponent} from "./layout/adm-nps/adm-header-detail/adm-header-detail.component";
import {HttpClientModule} from "@angular/common/http";
import {AdmMenuComponent} from "./layout/adm-nps/adm-menu/adm-menu.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesModule} from "primeng/messages";
// import {AutoCompleteModule, ConfirmDialogModule, DialogModule, TableModule} from "primeng";
import {ExternoModule} from "./externo/externo.module";
// import {ConfirmationService, MessageService} from "primeng/api";
import {NotificationService} from "./shared/messages/notification.service";
import {AdmTemplateComponent} from "./layout/adm-nps/adm-template/adm-template.component";
import { GraficoPesquisaComponent } from './pesquisa/grafico-pesquisa/grafico-pesquisa.component';
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ChartModule} from "primeng/chart";

@NgModule({
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    PesquisaCadastroComponent,
    EmpresaPesquisaComponent,
    EmpresaCadastroComponent,
    ListaPesquisaComponent,
    AdmAsideComponent,
    AdmFooterComponent,
    AdmHeaderComponent,
    AdmHeaderDetailComponent,
    AdmMenuComponent,
    AdmTemplateComponent,
    HomeComponent,
    GraficoPesquisaComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ToastModule,
    MessagesModule,
    TableModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    ExternoModule,
    DialogModule,
    DividerModule,
    ChartModule
  ],
  providers: [MessageService, NotificationService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
