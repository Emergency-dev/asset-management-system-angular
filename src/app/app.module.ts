import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutConfig } from './layout/layout/services/layout-config.service';
import { SidebarIconComponent } from './components/sidebar/sidebar-icon/sidebar-icon.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { PointOfSaleComponent } from './pages/point-of-sale/point-of-sale.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { PointOfSaleAddComponent } from './components/point-of-sale-add/point-of-sale-add.component';
import { SelectCustomerComponent } from './components/point-of-sale-add/ui/select-customer/select-customer.component';
import { CartItemListComponent } from './components/point-of-sale-add/ui/cart-item-list/cart-item-list.component';
import { PointOfSaleTableComponent } from './components/point-of-sale-table/point-of-sale-table.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { CartItemAddComponent } from './components/point-of-sale-add/ui/cart-item-list/cart-item-add/cart-item-add.component';
import { NgxPopper } from 'angular-popper';
import { CustomerDetailsComponent } from './components/point-of-sale-add/ui/customer-details/customer-details.component';
import { ReviewDetailsComponent } from './components/point-of-sale-add/ui/review-details/review-details.component';

const appRoutes: Routes = [
  {path:'', component: PointOfSaleComponent},
  {path: 'point-of-sale', component: PointOfSaleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    SidebarIconComponent,
    PointOfSaleComponent,
    ModalComponent,
    PointOfSaleAddComponent,
    SelectCustomerComponent,
    CartItemListComponent,
    PointOfSaleTableComponent,
    CartItemAddComponent,
    CustomerDetailsComponent,
    ReviewDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    FormsModule,
    NgxPopper
  ],
  providers: [LayoutConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
