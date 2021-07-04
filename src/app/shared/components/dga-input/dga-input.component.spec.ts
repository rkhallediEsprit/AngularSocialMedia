import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgaInputComponent } from './dga-input.component';

describe('DgaInputComponent', () => {
  let component: DgaInputComponent;
  let fixture: ComponentFixture<DgaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgaInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
