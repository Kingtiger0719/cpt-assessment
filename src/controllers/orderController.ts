import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/orderService";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const status = req.query.status as any;
    const orderType = req.query.orderType as any;
    const result = await orderService.listOrders({
      page,
      limit,
      status,
      orderType,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order = await orderService.getOrderById(id);
    if (!order) res.status(404).json({ message: "Order not found" });
    else res.json(order);
  } catch (err) {
    next(err);
  }
};

export const patchOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, preparationNotes } = req.body;
    const order = await orderService.updateOrder(id, {
      status,
      preparationNotes,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
};
