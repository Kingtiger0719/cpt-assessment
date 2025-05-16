export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "completed";

export type OrderType = "delivery" | "pickup";

export interface OrderItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Order {
  id: string | number;
  customerName: string;
  customerEmail: string;
  orderType: OrderType;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
  scheduledFor?: string;
  preparationNotes: string;
}

export interface OrderUpdatePayload {
  status?: OrderStatus;
  preparationNotes?: string;
}

export interface NewOrderPayload {
  customerName: string;
  customerEmail: string;
  orderType: OrderType;
  items: Omit<OrderItem, "id">[];
  scheduledFor?: string;
  preparationNotes?: string;
}
