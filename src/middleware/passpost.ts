import passport from "passport";
import {Strategy} from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';
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

// @ts-ignore
passport.use(new GoogleStrategy({
    clientID: "592878063533-956a1tk0av1rh5qkep1suovd4amjd1ku.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile, 'profile');
        let existingUser = await UserModel.findOne({'google.id': profile.id})
        if (existingUser) {
            return done(null, existingUser);
        }
        console.log('Creating new user...');

        const newUser = new UserModel({
            google: {
                id: profile.id
            },
            username: profile.emails[0].value,
            password: null
        })
        await newUser.save();
        console.log(newUser, 'newUser');
        return done (null, newUser);
    } catch(err) {
        return done(null, false);
    }
}
))

export default passport;