import { Customer } from "./customer-type.enum";

export class CustomerInfo{
    name:string = "";
    address:string = "";
    contactNumber:string = "";
    customerType:Customer = Customer.Regular
    customerCode:number =0;
    customerId:number =0;
    OrganizationCode:number =0;
    OrganizationName:string = "";
    CityName:string = "";
    
    // Dev-Taha Added some require Fields

    //cityName:string = "";
    //extraContactNumber:string[] = []

    constructor(){
    }
}