import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBuildingPersonnelComponent } from './my-building-personnel.component';

describe('MyBuildingPersonnelComponent', () => {
  let component: MyBuildingPersonnelComponent;
  let fixture: ComponentFixture<MyBuildingPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBuildingPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBuildingPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
