import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoPage } from './grafico.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoPageRoutingModule {}
