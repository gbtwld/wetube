import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`,
            scope: "user:email",
        },
        githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: `https://shaggy-yak-42.loca.lt${routes.facebookCallback}`,
            profileFields: ["id", "displayName", "photos", "email"],
            scope: ["public_profile", "email"],
        },
        facebookLoginCallback
    )
);

passport.serializeUser(
    User.serializeUser(function (user, done) {
        done(null, user);
    })
);
passport.deserializeUser(
    User.deserializeUser(function (user, done) {
        done(null, user);
    })
);