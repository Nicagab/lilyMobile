import { ComponentFixture, TestBed } from '@angular/core/testing';
import ArtigoPage from './artigo.page';

describe('ArtigoPage', () => {
  let component: ArtigoPage;
  let fixture: ComponentFixture<ArtigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
