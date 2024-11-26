import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacaoPage } from './publicacao.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacaoPageRoutingModule {}
