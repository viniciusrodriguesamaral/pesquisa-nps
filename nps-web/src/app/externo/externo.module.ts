// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';
import {PesquisaComponent} from './pesquisa/pesquisa.component';
// @ts-ignore
import {FormsModule} from '@angular/forms';
// @ts-ignore
import {ToastModule} from 'primeng/toast';
// @ts-ignore
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MessagesModule} from 'primeng/messages';

@NgModule({
  declarations: [ PesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MessagesModule
  ]
})
export class ExternoModule { }
