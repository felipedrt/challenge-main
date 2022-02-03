import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessageValidationComponent } from './form-message-validation.component';

describe('FormMessageValidationComponent', () => {
  let component: FormMessageValidationComponent;
  let fixture: ComponentFixture<FormMessageValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMessageValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMessageValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
