import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagedetailComponent } from './packagedetail.component';

describe('PackagedetailComponent', () => {
  let component: PackagedetailComponent;
  let fixture: ComponentFixture<PackagedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
