import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelSettingsComponent } from './personnel-settings.component';

describe('PersonnelSettingsComponent', () => {
  let component: PersonnelSettingsComponent;
  let fixture: ComponentFixture<PersonnelSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
