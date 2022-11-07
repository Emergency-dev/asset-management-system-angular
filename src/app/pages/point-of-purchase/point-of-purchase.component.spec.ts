import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfPurchaseComponent } from './point-of-purchase.component';

describe('PointOfPurchaseComponent', () => {
  let component: PointOfPurchaseComponent;
  let fixture: ComponentFixture<PointOfPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointOfPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointOfPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
