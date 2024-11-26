import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtigoPageRoutingModule } from './artigo-routing.module';

import ArtigoPage from './artigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtigoPageRoutingModule
  ],
  declarations: [ArtigoPage]
})
export class ArtigoPageModule {}
