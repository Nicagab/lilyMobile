import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';

import { provideHttpClient } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';

import { GoogleChartsModule, GoogleChartComponent } from 'angular-google-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), GoogleChartsModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
