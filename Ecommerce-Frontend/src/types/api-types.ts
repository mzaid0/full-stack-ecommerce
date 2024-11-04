import { Products, User } from "./types";

export type CustomError = {
  status:number;
  data:{
    success:boolean;
    message: string;
  }
}

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user:User
};

export type ProductsResponse = {
  success: boolean;
  products: Products[]
}

export type CategoryResponse = {
  success: boolean;
  categories: string[]
}

export type SearchProductResponse = {
  success: boolean;
  products: Products[]
  totalPages: number;
}

export type ProductResponse = {
  success: boolean;
  product: Products
}

export type updateProductResponse = {
  userId:string,
  productId: string,
  formData:FormData
} 

export type deleteProductResponse = {
  userId:string,
  productId: string,
} 


