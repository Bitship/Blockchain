import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpackageComponent } from './searchpackage.component';

describe('SearchpackageComponent', () => {
  let component: SearchpackageComponent;
  let fixture: ComponentFixture<SearchpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
