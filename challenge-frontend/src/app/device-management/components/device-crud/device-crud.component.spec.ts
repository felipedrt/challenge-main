import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCrudComponent } from './device-crud.component';

describe('DeviceCrudComponent', () => {
  let component: DeviceCrudComponent;
  let fixture: ComponentFixture<DeviceCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
