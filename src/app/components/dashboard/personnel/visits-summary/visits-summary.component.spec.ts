import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsSummaryComponent } from './visits-summary.component';

describe('VisitsSummaryComponent', () => {
  let component: VisitsSummaryComponent;
  let fixture: ComponentFixture<VisitsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
