import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import ArtigoPage from './artigo.page';

const routes: Routes = [
  {
    path: '',
    component: ArtigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtigoPageRoutingModule {}
