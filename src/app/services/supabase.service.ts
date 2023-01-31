import { Injectable } from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { initSupabase } from 'src/app/utils/initSupabase'

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
        const result = await this.supabase.from(TABLE_PRODUCTS).select('"ProductCode", "ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate"');
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }

    async getCustomers() {
        const result = await this.supabase.from(TABLE_CUSTOMERS).select(`CustomerId, CustomerName, Address, Mobile, CityName`);
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

    async addOrderDetails(product_id: string, product_quantity: number, product_cartonquantity: number, cust_id: string, phoneNumber: number, customerType: string) {
        let { data, error } = await this.supabase
            .rpc('add_order_det', {
                product_id: product_id,
                product_quantity: product_quantity,
                cust_id: cust_id,
                product_cartonquantity: product_cartonquantity,
                phonenumber: phoneNumber,
                customertype: customerType
            })

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
    async getSelectedProducts(cust_id:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate"')
        .eq("ProductCode",cust_id);
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async getSelectedProductsByName(cust_name:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate", "*"')
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
    async updateSelectedProducts(prod_code:any,cat:any,prod_name:any,pack:any,m_unit:any,sale_rate:any,wh_rate:any) {
        const result = await this.supabase
        .from(TABLE_PRODUCTS)
        .update({Category:cat,ProductName:prod_name,Packing:pack,MeasureUnit:m_unit,SaleRate:sale_rate,WHRate:wh_rate})
        // .select('"ProductCode","Category","SubCatCode","ProductName", "SaleRate", "MinRate", "MeasureUnit","Packing","UrduName", "WHRate", "CtnWHRate"')
        .eq("ProductCode",prod_code);
        if(result.error) console.log(result.error);
        console.log("RESULT");
        console.log(result);
        return result || [];
    }
    async userLogIn(uname:string , pass: string ){   
    //     const {  error } = await this.supabase.auth.signUp({
    //         email: 'someone@email.com',
    //         password: 'example-password',
    //       })
    //     const result = await this.supabase.auth.signInWithPassword({
    //     email: 'someone@email.com',
    //     password: 'example-password'
    // })
    const result = await this.supabase
    .from("users")
    .select('userid')
    .eq("username",uname)
    .eq("password",pass);
    console.log("RESULT");
    console.log(result);
    return result || [];
    }
    
}
