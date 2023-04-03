import { withIronSessionApiRoute } from "iron-session/next";
import {sessionOptions} from "../../../lib/session";

export default withIronSessionApiRoute(
    function logoutRoute(req, res, session) {
        const { method } = req;

        try {
            if(method !== 'POST') {
                throw new Error('This form was not submitted in the appropriate manner.');
            }

            req.session.destroy();
            res.send({ ok: true });
        } catch (e) {
            res.status(400).json({success: false, message: e.message})
        }
    }, sessionOptions
)