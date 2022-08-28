import { CustomerInfo } from "./customer-info.model";
import { ProductInfo } from "./product-info.model";
import { UserInfo } from "./user-info.model";

export class TransactionInfo{
    transactionId:string = "";
    transactionDate?:Date;
    cartItemList: cartItemInfo[] = [];
    customerInfo: CustomerInfo = new CustomerInfo();
    userInfo: UserInfo = new UserInfo();

    constructor(){}
}

export class cartItemInfo{
    productInfo: ProductInfo = new ProductInfo();
    quantity:number = 0;
    unit:string = "";
    price:number = 0;
}