import axios from "axios";
import { Order, OrderUpdatePayload, NewOrderPayload } from "../types/order";

const API_BASE_URL = "http://localhost:3001/api"; // Update if deployed differently

// Fetch all orders with optional filters
export const fetchOrders = async (params?: {
  status?: string;
  orderType?: string;
  customerName?: string;
  page?: number;
  limit?: number;
}): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`, {
    params,
  });
  console.log(response.data);
  return response.data;
};

// Fetch a specific order by ID
export const fetchOrderById = async (id: string | number): Promise<Order> => {
  const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

// Update an existing order
export const updateOrder = async (
  id: string | number,
  payload: OrderUpdatePayload
): Promise<Order> => {
  const response = await axios.patch<Order>(
    `${API_BASE_URL}/orders/${id}`,
    payload
  );
  return response.data;
};

// Create a new order (for testing/demo)
export const createOrder = async (payload: NewOrderPayload): Promise<Order> => {
  const response = await axios.post<Order>(`${API_BASE_URL}/orders`, payload);
  return response.data;
};
