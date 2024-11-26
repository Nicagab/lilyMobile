import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoPage } from './grafico.page';

describe('GraficoPage', () => {
  let component: GraficoPage;
  let fixture: ComponentFixture<GraficoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
