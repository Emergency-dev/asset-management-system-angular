import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemAddComponent } from './cart-item-add.component';

describe('CartItemAddComponent', () => {
  let component: CartItemAddComponent;
  let fixture: ComponentFixture<CartItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
