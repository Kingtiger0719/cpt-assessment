import { PrismaClient, OrderStatus, OrderType } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (data: {
  customerName: string;
  customerEmail: string;
  orderType: OrderType;
  items: {
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  scheduledFor?: Date;
}) => {
  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      orderType: data.orderType,
      total,
      scheduledFor: data.scheduledFor,
      items: {
        create: data.items,
      },
    },
    include: { items: true },
  });
};

export const listOrders = async (opts: {
  page: number;
  limit: number;
  status?: OrderStatus;
  orderType?: OrderType;
}) => {
  const { page, limit, status, orderType } = opts;
  const where: any = {};
  if (status) where.status = status;
  if (orderType) where.orderType = orderType;

  const [orders, count] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total: count };
};

export const getOrderById = async (id: number) => {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
};

export const updateOrder = async (
  id: number,
  data: Partial<{
    status: OrderStatus;
    preparationNotes: string;
  }>
) => {
  return prisma.order.update({
    where: { id },
    data,
    include: { items: true },
  });
};
