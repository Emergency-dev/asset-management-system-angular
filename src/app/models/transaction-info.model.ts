import { CustomerInfo } from "./customer-info.model";
import { ProductInfo } from "./product-info.model";
import { UserInfo } from "./user-info.model";

export class TransactionInfo{
    transactionId:string = "";
    transactionDate!:Date;
    cartItemList: CartItemInfo[] = [];
    customerInfo: CustomerInfo = new CustomerInfo();
    userInfo: UserInfo = new UserInfo();

    constructor(){}
}

export class CartItemInfo{
    productInfo: ProductInfo = new ProductInfo();
    quantity:number = 0;
    unit:string = "";
    price:number = 0;
    totalPrice:number = 0;
}