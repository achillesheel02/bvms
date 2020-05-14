import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingOwnerComponent } from './building-owner.component';

describe('BuildingOwnerComponent', () => {
  let component: BuildingOwnerComponent;
  let fixture: ComponentFixture<BuildingOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
