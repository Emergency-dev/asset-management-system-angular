import { Customer } from "./customer-type.enum";

export class CustomerInfo{
    name:string = "";
    address:string = "";
    contactNumber:string = "";
    customerType:Customer = Customer.Regular
    customerCode:number =0;
    OrganizationCode:number =0;
    OrganizationName:string = "";


    constructor(){
    }
}