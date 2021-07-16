import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfirmationComponent } from './show-confirmation.component';

describe('ShowConfirmationComponent', () => {
  let component: ShowConfirmationComponent;
  let fixture: ComponentFixture<ShowConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
