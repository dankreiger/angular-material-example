export interface Recipient {
  name: string;
  email: string;
}

export interface TotalPrice {
  currency: string;
  amount: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  total_price: TotalPrice;
}

export interface Delivery {
  courier: string;
  method: string;
}

export interface ChargeCustomer {
  currency: string;
  total_price: string;
}

export interface Order {
  id: string;
  recipient: Recipient;
  created_at: Date;
  items: OrderItem[];
  delivery: Delivery;
  charge_customer: ChargeCustomer;
  selected?: boolean;
}

export interface OrderComposed {
  id: string;
  name: string;
  email: string;
  total_price: string;
  order_date: string;
  items: string;
  delivery_details: string;
  selected?: boolean;
}

export interface OrderDetails {
  dateRange: string;
  numberOfDays: number;
  totalAmountToInvoice: string;
  numberOfOrders: number;
}
