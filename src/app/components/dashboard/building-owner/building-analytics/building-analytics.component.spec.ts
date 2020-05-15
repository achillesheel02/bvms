import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAnalyticsComponent } from './building-analytics.component';

describe('BuildingAnalyticsComponent', () => {
  let component: BuildingAnalyticsComponent;
  let fixture: ComponentFixture<BuildingAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
