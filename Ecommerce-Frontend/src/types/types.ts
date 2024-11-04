export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: string;
  dob: string;
}

export interface Products {
  _id: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}

export interface SearchProductRequest {
  price: number;
  category: string;
  search: string;
  page: number;
  sort: string;
}

export interface NewProductRequest {
  id: string;
  formData: FormData;
}

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
