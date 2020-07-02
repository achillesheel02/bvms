import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQrCodeComponent } from './my-qr-code.component';

describe('MyQrCodeComponent', () => {
  let component: MyQrCodeComponent;
  let fixture: ComponentFixture<MyQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
