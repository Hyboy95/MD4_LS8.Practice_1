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

authRouter.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get('/google/callback', passport.authenticate('google'),
(req, res) => {
res.send("you are authenticated")
}
)