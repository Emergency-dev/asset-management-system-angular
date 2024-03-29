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
import { CartComponent } from './components/point-of-sale-add/ui/cart/cart.component';
import { PointOfPurchaseComponent } from './pages/point-of-purchase/point-of-purchase.component';
import { PointOfPurchaseAddComponent } from './components/point-of-purchase-add/point-of-purchase-add.component';
import { PurchaseCartComponent } from './components/point-of-purchase-add/ui/purchase-cart/purchase-cart.component';
import { NewPageComponent } from './components/new-page/new-page.component';
import { CartItemComponent } from './components/point-of-sale-add/ui/cart/cart-item/cart-item.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { AddUserComponent } from './pages/user-management/add-user/add-user.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { EditCustomerPageComponent } from './components/edit-customer-page/edit-customer-page.component';

const appRoutes: Routes = [
  {path:'', component: PointOfSaleComponent},
  {path: 'point-of-sale', component: PointOfSaleComponent},
  {path: 'point-of-purchase', component: PointOfPurchaseComponent},
  {path:'user-management', component: UserManagementComponent }
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
    ReviewDetailsComponent,
    CartComponent,
    PointOfPurchaseComponent,
    PointOfPurchaseAddComponent,
    PurchaseCartComponent,
    NewPageComponent,
    CartItemComponent,
    EditPageComponent,
    LoginPageComponent,
    UserManagementComponent,
    UserListComponent,
    AddUserComponent,
    AddNewProductComponent,
    EditCustomerPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule,
    FormsModule,
    NgxPopper,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [LayoutConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
