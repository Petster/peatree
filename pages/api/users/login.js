import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import generateToken from "../../../lib/generateToken";
import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "../../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {
    const { method } = req;
    const { username, password } = req.body;

    await dbConnect();

    try {
        if(method !== 'POST') {
            throw new Error('This form was not submitted in the appropriate manner.');
        }

        if(!username || !password) {
            throw new Error('Please fill all required fields!');
        }

        const user = await User.findOne({'username': username}).collation({locale: "en", strength: 2});

        if(user && (await user.matchPassword(password))) {
            req.session.user = {
                isLoggedIn: true,
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id, user.isAdmin),
                isAdmin: user.isAdmin,
                createdAt: user.createdAt
            };
            await req.session.save();
            res.send({ ok: true });
        } else {
            throw new Error('Email or Password are invalid')
        }
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}