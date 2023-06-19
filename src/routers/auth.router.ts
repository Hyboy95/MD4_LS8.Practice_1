import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import passport from "../middleware/passpost";

export const authRouter = Router();

authRouter.get('/success', AuthController.getSuccesspage)
authRouter.get('/login', AuthController.getLoginPage);
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/login'
}));