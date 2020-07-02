import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSettingsComponent } from './guest-settings.component';

describe('GuestSettingsComponent', () => {
  let component: GuestSettingsComponent;
  let fixture: ComponentFixture<GuestSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
