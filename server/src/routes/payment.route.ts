import { PaymentController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.post(
    "/",
    isAuthenticated,
    PaymentController.create
);

router.get(
    "/success",
    isAuthenticated,
    PaymentController.success
);

router.post(
    "/success",
    isAuthenticated,
    PaymentController.success
);

router.get(
    "/cancel",
    isAuthenticated,
    PaymentController.cancel
);

router.get(
    "/:id",
    isAuthenticated,
    PaymentController.getById
);

export default router;
