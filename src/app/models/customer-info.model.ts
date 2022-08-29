import { Customer } from "./customer-type.enum";

export class CustomerInfo{
    name:string = "";
    address:string = "";
    contactNumber:string = "";
    customerType:Customer = Customer.Regular

    constructor(){
    }
}