import { OrderController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.get(
    "/",
    isAuthenticated,
    OrderController.get
);

router.get(
    "/:id",
    isAuthenticated,
    OrderController.getById
);

router.post(
    "/",
    isAuthenticated,
    OrderController.create
);

export default router;