import { Injectable } from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { initSupabase } from 'src/app/utils/initSupabase'
import { initSupabaseProduction } from '../utils/initSupabaseProduction'

export const TABLE_PRODUCTS = 'Products'
export const TABLE_CUSTOMERS = 'ShopCustomer'
export const TABLE_TRANSACTION = 'TransactionInfo'

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            initSupabase.supabaseUrl,
            initSupabase.supabaseKey
        );
    }

    async getProducts() {
        const result = await this.supabase.from(TABLE_PRODUCTS).select('"ProductCode", "ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate","CartonPrice"');
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }

    async getCustomers() {
        const result = await this.supabase.from(TABLE_CUSTOMERS).select(`CustomerCode,CustomerId, CustomerName, Address, Mobile, CityName`);
        return result || [];
    }
    async getCustomerById(id:any) {
        const result = await this.supabase
        .from(TABLE_CUSTOMERS).select(`CustomerCode,CustomerId, CustomerName, Address, Mobile, CityName`)
        .eq('CustomerId',id);
        return result || [];
    }
    async updateCustomerById(id:any,cust_name: string, cust_address: string, cust_city: string, cust_phone: string, cust_code: string) {
        const result = await this.supabase
        .from(TABLE_CUSTOMERS)
        .update({CustomerCode:cust_code, CustomerName:cust_name, Address:cust_address, Mobile:cust_phone, CityName:cust_city})
        .eq('CustomerId',id);
        return result || [];
    }

    async saveNewPageData(product_id: string, sale_ids: string) {
        const { data, error } = await this.supabase.rpc("newpage_data", { product_id: product_id, sale_ids: sale_ids });
        console.log(data);
        if (error) console.log(error);
    }

    async addCustomerDetails(cust_name: string, cust_address: string, cust_city: string, cust_country: string, cust_fax: string, cust_mobile: number, cust_email: string, cust_credit_days: string, cust_credit_limit: string) {
        let { data, error } = await this.supabase
            .rpc('add_customer_details', {
                cust_address: cust_address,
                cust_city: cust_city,
                cust_country: cust_country,
                cust_credit_days: cust_credit_days,
                cust_credit_limit: cust_credit_limit,
                cust_email: cust_email,
                cust_fax: cust_fax,
                cust_mobile: cust_mobile,
                cust_name: cust_name
            })

        if (error) console.error(error)
        else console.log(data)
    }

    async addTransactionDetails(seller_name: string, cust_name: string, total_products: number, total_price: number, cust_id: string) {
        let { data, error } = await this.supabase
            .rpc('add_transaction_details', {
                cust_name: cust_name,
                seller_name: seller_name,
                total_price: total_price,
                total_products: total_products,
                cust_id: cust_id
            })

        if (error) console.error(error)
        else console.log(data)
    }

    async getTransaction() {
        const result = await this.supabase.from(TABLE_TRANSACTION).select(`*`);
        return result || [];
    }

    async addOrderDetails(product_id: string, product_quantity: number, product_cartonquantity: number, cust_id: string, phoneNumber: number, customerType: string, user_ID: string) {
        // let { data, error } = await this.supabase
        //     .rpc('add_order_det', {
        //         product_id: product_id,
        //         product_quantity: product_quantity,
        //         cust_id: cust_id,
        //         product_cartonquantity: product_cartonquantity,
        //         phonenumber: phoneNumber,
        //         customertype: customerType
        //     })
        let { data, error } = await this.supabase
        .from('Order')
        .insert({ProductId:product_id,ProductQuantity:product_quantity,CustomerId:cust_id,CartonQuantity:product_cartonquantity,PhoneNumber:phoneNumber,CustomerType:customerType, userID:user_ID})
        if (error) console.error(error)
        else console.log(data)

    }

    async getOrderData(cust_id: any, trans_date: any) {
        let result= await this.supabase
            .from('Order')
            .select("*")
            .eq('CustomerId', cust_id)
            .eq('OrderDate', trans_date);  
            return result || [];
    }
    async updateOrderData(cust_id: any, trans_date: any,prod_id:any, carton: any,quantity:any) {
        let result= await this.supabase
            .from('Order')
            .update({ProductQuantity:quantity,CartonQuantity:carton})
            .eq('CustomerId', cust_id)
            .eq('ProductId', prod_id)
            .eq('OrderDate', trans_date);   
            return result || [];
    }
    async getSelectedProducts(cust_id:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate","CartonPrice"')
        .eq("ProductCode",cust_id);
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async getSelectedProductsByName(cust_name:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate","CartonPrice", "*"')
        .ilike("ProductName",'%'+cust_name+'%');
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async addEditProduct(prod_code:any,cat:any,prod_name:any,pack:any,m_unit:any,sale_rate:any,wh_rate:any,urduName:any){
        let { data, error } = await this.supabase
        .rpc('add_Edited_Products_test', {
            prod_code: prod_code,
            cat: cat,
            prod_name: prod_name,
            package: pack,
            m_unit: m_unit,
            sale_rate: sale_rate,
            wh_rate:wh_rate,
            urdu_name:urduName
        })

    if (error) console.error(error)
    else console.log(data)
    }
    async insertNewProducts(prod_code:any,cat:any,prod_name:any,pack:any,m_unit:any,sale_rate:any,wh_rate:any,urdu_name:any,cbm:any,weight:any,cartonPrice:any) {
        // const checkCode = await this.supabase
        // .from(TABLE_PRODUCTS)
        // .select('*')
        // .eq("ProductCode",prod_code);
        // if(checkCode?.count!=0){
        // }
        const result2 =await this.supabase
        .from('MultiWeightProducts')
        .insert({ProductCode:prod_code,CBM:cbm,Weight:weight,Pieces:pack});
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .insert({ProductCode:prod_code,Category:cat,ProductName:prod_name, SaleRate:sale_rate, MeasureUnit:m_unit,Packing:pack,UrduName:urdu_name, WHRate:wh_rate,CartonPrice:cartonPrice})
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async updateSelectedProducts(prod_code:any,cat:any,prod_name:any,pack:any,m_unit:any,sale_rate:any,wh_rate:any,cartonPrice:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .update({Category:cat,ProductName:prod_name,Packing:pack,MeasureUnit:m_unit,SaleRate:sale_rate,WHRate:wh_rate,CartonPrice:cartonPrice})
        // .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate"')
        .eq("ProductCode",prod_code);
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async userLogIn(uname:string , pass: string ){   
    const result = await this.supabase
    .from("users")
    .select('"userid","username","firstname","lastname","isactive","isadmin"')
    .eq("username",uname)
    .eq("password",pass);
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
    async GetUsers() {
        const result = await this.supabase
    .from("users")
    .select('"userid","username","firstname","lastname","isactive","isadmin"');
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
    async InsertUsers(uname:any,fname:any,lname:any,passwd:any,isactive:any,isadmin:any) {
        const result = await this.supabase
    .from("users")
    .insert({password:passwd,username:uname,firstname:fname,lastname:lname,isactive:isactive,isadmin:isadmin});
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
    async SelectUsers(id:any) {
        const result = await this.supabase
    .from("users")
    .select('"userid","username","firstname","lastname","isactive","isadmin","password"')
    .eq('userid',id);
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
    async UpdateUsers(id:any,uname:any,fname:any,lname:any,passwd:any,isactive:any,isadmin:any) {
        const result = await this.supabase
    .from("users")
    .update({password:passwd,username:uname,firstname:fname,lastname:lname,isactive:isactive,isadmin:isadmin})
    .eq('userid',id);
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
}
