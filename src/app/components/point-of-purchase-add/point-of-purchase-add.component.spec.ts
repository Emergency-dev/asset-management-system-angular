import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfPurchaseAddComponent } from './point-of-purchase-add.component';

describe('PointOfPurchaseAddComponent', () => {
  let component: PointOfPurchaseAddComponent;
  let fixture: ComponentFixture<PointOfPurchaseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointOfPurchaseAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointOfPurchaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
