export class MailBean {
    PASSWORD_RESET =1;
  subject: string;
  body: string;
  email: string;
  }
  
  export class Review {
  
    id:number;
    shopId:number;
    userId : number;
    commentEn:string;
    commentAr:string;
    rating:number;
    status:number;
    statusDescEn: string;
    statusDescAr: string;
  }
  
  export class Message{
    code: number;
    message: string;
  }
  export class Shop
  {
    shopId:number;
  shopName:string;
  phoneMobile:string;
  phoneHotline:string;
  whatsAppPhone:string;
  preferredLang:string;
  latitude:number;
  longitude:number;
  status:number;
  dateCreated:Date;
  dateUpdated:Date;
  street:string ;
  country:number;
  province:string;
  city:string;
  minOrderAmount:number;
  deliveryCharge:number;
  keywords:string;
  categoryId:number;
  currency:string;
    deliveryDurationMin:number;
    profileUrl:string;
  
  }
  
  export class User
  {
    userId: number;
  username:any
  password:any
  phone:any
  type:number ;
  email: string;
  whatsAppPhone: string;
  preferredLang: string;
  notificationSend:number ;
  latitude:number;
  longitude:number;
  status:number;
  dateCreated:any
  dateUpdated:any
  address:string;
  country:number;
  province:number;
  city:number;
  profilePicture:string;
  //	priceMarkupId:number; 
  authToken:string;
    enabled = true;
    minOrderAmt:number;
    keywords: string;
    deliveryCharge: number;
    categoryId: number;
    currency: string;
  }
  
  export class OrderDetail {
  
  cartId: number;
  itemCode: number;
  quantity: number;
  unit: any;
  price: number;
  itemNameEn: string ;
  itemNameAr: string ;
  commentDtl: string ;
  }
  
  export class OrderDetailReq {
  
  cartId: number;
  itemCode: number;
  quantity: number;
  unit:any
  price: number;
  itemNameEn: string ;
  itemNameAr: string ;
  commentDtl: string ;
  }
  
  export class OrderHeader {
    constructor() {}
    userId;
    cartId ;
   // userName ;
    dateCreated ;
    totalAmount ;
    totalItems ;
    deliveryStatus ;
    deliveryFee ;
    dlvSchId ;
    latitude ;
    longitude ;
    shopId;
    comment;
    statusDescEn;
    statusDescAr;
    deliveryTime;    
    currency;
    dlvAddressName;
    dlvAddressStrret;
    dlvAddressCity;
    dlvAddressProvince;
    dlvAddressCountry;
  }
  
  export class OrderHeaderReq {
    constructor() {}
    userId;
    cartId ;
   // userName ;
    dateCreated ;
    totalAmount ;
    totalItems ;
    deliveryStatus ;
    deliveryFee ;
    dlvSchId ;
    latitude ;
    longitude ;
    shopId;
    comment;
    statusDescEn;
    statusDescAr;
    deliveryTime;    
    currency;
    dlvAddressName;
    dlvAddressStrret;
    dlvAddressCity;
    dlvAddressProvince;
    dlvAddressCountry;
  }
  
  export class OrderDetails {
     constructor() {}
    cartId;
    itemCode;
    quantity;
    unit;
    price;
    itemDescEn;
    itemDescAr;
    comment;
  }
  
  export class Cart {
  
    orderHeader: OrderHeader = new OrderHeader();
    orderDetails: Item[] = [];
  }
  
  export class CartReq {
  
    orderHeaderReq: OrderHeaderReq = new OrderHeaderReq();
    dlvAddressReq: Address = new Address();
    orderDetailsReq: ItemReq[] = [];
  }
  
  export class Status {
    id: number;
    descriptionAr: string ;
    descriptionEn: string ;
  }
  
  export class Address
    {
        id: number;
        userId: number;
        nickName: string;
        street: string;
        cityId: number;
        cityEn: string;
        cityAr: string;
        provinceId: number;
        provinceEn: string;
        provinceAr: string;
        countryId: number;
        countryEn: string;
        countryAr: string;
    }
  
  export class KeyValue {
    id: number;
    nameEn: string;
    nameAr: string;
  }
  
  export class Category
  {
    categoryId: number;
    nameEn: string ;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;    
    imageEn: string;
    imageAr: string;
    status: number
  }
  
  export class ItemList {
    itemlist: Item[];
    size: number = 0;
    totalPages: number =0;
  }
  
  
  export class CartList {
    cartlist: Cart[];
    size: number = 0;
    totalPages: number =0;
  }
  
  
  /*
  export class AddCart {
    comment: string;
    qty: number = 1;
    itemCode: string;
  }
  */
  export class Item {
  
        itemCode: number;
        category: number;
        nameEn: string;
        nameAr: string;
        descriptionEn: string;
        descriptionAr: string;
        status: string;
        statusDescEn: string;
        statusDescAr: string;
        price: number;
        unit: string;
        sortId: number;
        img1: string;
        img2: string;
        img3: string;
        bestBuy: number;
        shopId: number;
        supPrice: number;
        quantity:number =1;
        commentDtl: string;
        comment:string;
    }
    
  export class ItemReq {
  
        itemCode: number;
        category: number;
        nameEn: string;
        nameAr: string;
        descriptionEn: string;
        descriptionAr: string;
        status: string;
        statusDescEn: string;
        statusDescAr: string;
        price: number;
        unit: string;
        sortId: number;
        img1: string;
        img2: string;
        img3: string;
        bestBuy: number;
        shopId: number;
        supPrice: number;
        quantity:number =1;
        commentDtl: string;
        comment:string;
    }
    
  