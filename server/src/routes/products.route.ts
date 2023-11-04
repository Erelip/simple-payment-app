import { ProductsController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.get(
    "/",
    isAuthenticated,
    ProductsController.get
);

router.get(
    "/:id",
    isAuthenticated,
    ProductsController.getById
);

export default router;
