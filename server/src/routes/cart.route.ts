import { CartController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { isAuthenticated } from "@middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get(
    "/:id",
    isAuthenticated,
    CartController.getByUserId
);

router.post(
    "/:id",
    isAuthenticated,
    CartController.add
);

router.delete(
    "/",
    isAuthenticated,
    CartController.delete
);

router.delete(
    "/:id",
    isAuthenticated,
    CartController.deleteById
);

export default router;
