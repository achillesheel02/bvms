import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerComponent } from './business-owner.component';

describe('BusinessOwnerComponent', () => {
  let component: BusinessOwnerComponent;
  let fixture: ComponentFixture<BusinessOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
