import { CartController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { isAuthenticated } from "@middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    isAuthenticated,
    CartController.getByUserId
);

router.post(
    "/",
    isAuthenticated,
    CartController.add
);

router.patch(
    "/",
    isAuthenticated,
    CartController.update
);

router.delete(
    "/",
    isAuthenticated,
    CartController.delete
);

export default router;
