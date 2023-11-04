import { AuthController } from "@controllers";
import { validate } from "@middlewares/validator.middleware";
import { Router } from "express";

const router = Router();

router.post(
    "/signup",
    // validate(UserSchema.SignUpSchema),
    AuthController.signUp
);
router.post(
    "/signin",
    // validate(UserSchema.SignInSchema),
    AuthController.signIn
);
export default router;
