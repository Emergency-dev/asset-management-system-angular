import { TotalPrice } from "../components/point-of-sale-add/ui/cart/TotalPrice.model";
import { CustomerInfo } from "./customer-info.model";
import { ProductInfo } from "./product-info.model";
import { UserInfo } from "./user-info.model";

export class TransactionInfo{
    transactionId:string = "";
    transactionDate!:Date;
    cartItemList: CartItemInfo[] = [];
    customerInfo: CustomerInfo = new CustomerInfo();
    userInfo: UserInfo = new UserInfo();
    phoneNumber:string = "";
    grandTotal: number =0;

    constructor(){}
}

export class CartItemInfo{
    productInfo: ProductInfo = new ProductInfo();
    quantity:number = 0;
    unit:string = "";
    price:number = 0;
    cartonQuantity:number = 0;
    cartonPrice:number = 0;
    totalPrice:number = this.cartonPrice== 0 ? (this.cartonQuantity*this.productInfo.packing + this.quantity) * this.price : this.cartonPrice + this.quantity*this.price;
    
}