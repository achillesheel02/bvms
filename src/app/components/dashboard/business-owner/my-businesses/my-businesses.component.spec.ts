import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusinessesComponent } from './my-businesses.component';

describe('MyBusinessesComponent', () => {
  let component: MyBusinessesComponent;
  let fixture: ComponentFixture<MyBusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
