import { CustomerInfo } from "src/app/models/customer-info.model";

export class CartService{
    customerInfo: CustomerInfo = new CustomerInfo();
    customerInfoList:CustomerInfo[]=[];

    // private names = ["Salman", "Asad", "Haseeb", "Ali", "Hamza", "Hassan", "Bilal", "Karam", "Karam Ilahi"];
    // private companyNames = ["Suzuki", "Honda", "DevTech", "Shafiq Book", "Pepsi Limited", "CureMD", "RolusTech", "Systems", "NodeSol"];
    // private code = [0,1,2,3,4,5,6,7,8];
    // private companyCode = [0,1,2,3,4,5,6,7,8];
    // private phoneNumber = ["30","10","200","3123","444","523","6567","721","99999"];

    constructor(){
        // for(let i = 0; i < 9 ; i++){
        // let customerInfo = new CustomerInfo();
        // customerInfo.customerCode = this.code[i];
        // customerInfo.name = this.names[i];
        // customerInfo.OrganizationCode = this.companyCode[i];
        // customerInfo.OrganizationName = this.companyNames[i];
        // customerInfo.contactNumber = this.phoneNumber[i];
        // this.customerInfoList.push(customerInfo);
        // }
    }

    // async getCustomersData(){
    //     const cusInfo: Array<CustomerInfo> = [];
    //     const cusOptions = await (await this.dataService.getCustomers()).data;
    //     cusOptions?.map((item)=>{
    //       let cusInfo  = new CustomerInfo ();
    //       cusInfo =({
    //         customerCode: item.CustomerId,
    //         name: item.CustomerName,
    //         address: '',
    //         contactNumber: '',
    //         customerType: 1,
    //         OrganizationCode: 0,
    //         OrganizationName: '',
            
    //       })
    //       this.customerInfo1.push(cusInfo);
    //     });
    //   }
}