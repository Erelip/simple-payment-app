import { DefaultController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";

const router = Router();

router.get(
    "/",
    DefaultController.default
);

export default router;
