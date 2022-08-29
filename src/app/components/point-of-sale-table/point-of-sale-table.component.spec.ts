import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSaleTableComponent } from './point-of-sale-table.component';

describe('PointOfSaleTableComponent', () => {
  let component: PointOfSaleTableComponent;
  let fixture: ComponentFixture<PointOfSaleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointOfSaleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointOfSaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
