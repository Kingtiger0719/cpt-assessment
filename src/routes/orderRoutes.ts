import { Router } from "express";
import * as orderCtrl from "../controllers/orderController";

const router = Router();

router.post("/orders", orderCtrl.createOrder);
router.get("/orders", orderCtrl.listOrders);
router.get("/orders/:id", orderCtrl.getOrderById);
router.patch("/orders/:id", orderCtrl.patchOrder);

export default router;
