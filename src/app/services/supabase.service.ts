import {Injectable} from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { initSupabase } from 'src/app/utils/initSupabase'

export const TABLE_PRODUCTS = 'Products'
export const TABLE_CUSTOMERS = 'ShopCustomer'

@Injectable({
    providedIn: 'root',
})
export class DataService{
    private supabase: SupabaseClient;

    constructor(){
        this.supabase = createClient(
            initSupabase.supabaseUrl,
            initSupabase.supabaseKey
        );
    }

    async getProducts(){
        const result = await this.supabase.from(TABLE_PRODUCTS).select(`ProductCode, ProductName, SaleRate, MinRate, MeasureUnit`);
        return result || [];
    }

    async getCustomers(){
        const result = await this.supabase.from(TABLE_CUSTOMERS).select(`CustomerId, CustomerName`);
        return result || [];
    }

    async saveNewPageData(product_id:string, sale_ids:string){
        const {data,error} = await this.supabase.rpc("newpage_data" , {product_id : product_id,sale_ids : sale_ids});
        console.log(data);
        if(error) console.log(error);
    }
}
