import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckshipperComponent } from './checkshipper.component';

describe('CheckshipperComponent', () => {
  let component: CheckshipperComponent;
  let fixture: ComponentFixture<CheckshipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckshipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckshipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
