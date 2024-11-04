export interface OrderItemType {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface OrderType {
  name: string;
  address: string;
  city: string;
  country: string;
  state: string;
  status: "Processing" | "Shipped" | "Delivered";
  pinCode: number;
  subTotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItems: OrderItemType[];
  _id: string;
}
