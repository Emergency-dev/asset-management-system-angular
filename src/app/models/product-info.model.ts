import { Unit } from "./unit-type.enum";

export class ProductInfo{
    productId:string = "";
    productCode:string = "";
    productName:string = "";
    packing:number = -1;
    
    price:number = 0;
    minPrice:number = 0;
    maxPrice:number = 0;
    cartonPrice: number=0;

    productImageUrl:string = "";
    productUnitType?:Unit;

    productUnit:string = "";

    urduName:string ="";
}