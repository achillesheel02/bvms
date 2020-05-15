import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingOwnerSettingsComponent } from './building-owner-settings.component';

describe('BuildingOwnerSettingsComponent', () => {
  let component: BuildingOwnerSettingsComponent;
  let fixture: ComponentFixture<BuildingOwnerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingOwnerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingOwnerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
