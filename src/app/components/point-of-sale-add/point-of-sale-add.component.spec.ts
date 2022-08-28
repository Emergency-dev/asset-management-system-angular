import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSaleAddComponent } from './point-of-sale-add.component';

describe('PointOfSaleAddComponent', () => {
  let component: PointOfSaleAddComponent;
  let fixture: ComponentFixture<PointOfSaleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointOfSaleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointOfSaleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
