import {Injectable} from '@angular/core'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
// import { environment } from 'src/environments/environment'
import { initSupabase } from 'src/app/utils/initSupabase'
import { ProductInfo } from 'src/app/models/product-info.model'

export const TABLE_PRODUCTS = 'Products'

@Injectable({
    providedIn: 'root',
})
export class DataService{
    private supabase: SupabaseClient;
    listProducts: ProductInfo[] = [];
    products: any[]=[];

    constructor(){
        this.supabase = createClient(
            initSupabase.supabaseUrl,
            initSupabase.supabaseKey
        );
        
        // for(let i = 0; i < 1000 ; i++){
        //     let product: ProductInfo = new ProductInfo();
        //     product.productCode = this;
        //     product.name = this.names[i];
        //     product.OrganizationCode = this.companyCode[i];
        //     product.OrganizationName = this.companyNames[i];
        //     product.contactNumber = this.phoneNumber[i];
        //     this.customerInfoList.push(product);
        //     }
    }

    async getProducts(){
        const result = await this.supabase.from(TABLE_PRODUCTS).select(`ProductCode, ProductName, SaleRate, MinRate, MeasureUnit`);
        return result || [];
    }

    async loadProducts(){
        //this.products = await this.getProducts();
    }
}


// productId:string = "";
// productCode:string = "";
// productName:string = "";

// price:number = 0;
// minPrice:number = 0;
// maxPrice:number = 0;

// productImageUrl:string = "";
// productUnitType?:Unit;

// productUnit:string = "";
