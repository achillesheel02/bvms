import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitorComponent } from './add-visitor.component';

describe('AddVisitorComponent', () => {
  let component: AddVisitorComponent;
  let fixture: ComponentFixture<AddVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
