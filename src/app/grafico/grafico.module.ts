import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoPageRoutingModule } from './grafico-routing.module';

import { GraficoPage } from './grafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoPageRoutingModule
  ],
  declarations: [GraficoPage]
})
export class GraficoPageModule {}
