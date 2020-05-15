import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBusinessesResidingComponent } from './building-businesses-residing.component';

describe('BuildingBusinessesResidingComponent', () => {
  let component: BuildingBusinessesResidingComponent;
  let fixture: ComponentFixture<BuildingBusinessesResidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBusinessesResidingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBusinessesResidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
