import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerSettingsComponent } from './business-owner-settings.component';

describe('BusinessOwnerSettingsComponent', () => {
  let component: BusinessOwnerSettingsComponent;
  let fixture: ComponentFixture<BusinessOwnerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOwnerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOwnerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
