import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformacoesComponent } from './form-informacoes.component';

describe('FormInformacoesComponent', () => {
  let component: FormInformacoesComponent;
  let fixture: ComponentFixture<FormInformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInformacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
