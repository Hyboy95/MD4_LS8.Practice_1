import passport from "passport";
import {Strategy} from 'passport-local';
import { UserModel } from "../models/schemas/user.schema";


passport.use(new Strategy(async function verify(username: string, password: string, cb){
    const user = await UserModel.findOne({username});
    if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (user.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
}))


passport.serializeUser((user: any, cb) => {
    process.nextTick(() => {
        cb(null, { id: user._id, username: user.username });
    });
});


passport.deserializeUser((user: any, cb) => {
    process.nextTick(() =>{
        return cb(null, user);
    });
});
export default passport;