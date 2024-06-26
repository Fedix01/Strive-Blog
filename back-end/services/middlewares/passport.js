import GoogleStrategy from 'passport-google-oauth20';
import { config } from "dotenv";
import User from "../models/user.model.js";
import { generateJWT } from './authentication.js';

config();

const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_CB
}

const googleStrategy = new GoogleStrategy(options, async (_accessToken, __refreshToken, profile, passportNext) => {
    try {
        const { email, given_name, family_name, sub, picture, birthday } = profile._json;
        const user = await User.findOne({ email });

        if (user) {
            const accToken = await generateJWT({
                _id: user._id
            });

            passportNext(null, { accToken, email, given_name, family_name, picture, birthday, sub, _id: user._id })
        } else {
            const newUser = new User({
                nome: given_name,
                cognome: family_name,
                email: email,
                username: email,
                avatar: picture,
                password: sub,
                googleId: sub
            });

            await newUser.save();

            const accToken = await generateJWT({
                username: newUser.username
            });

            passportNext(null, { accToken, email, given_name, family_name, picture, birthday, sub, _id: newUser._id })
        }

    } catch (error) {
        passportNext(error)
    }
});

export default googleStrategy;