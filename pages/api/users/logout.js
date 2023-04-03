import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function logoutRoute(req, res, session) {
        req.session.destroy();
        res.send({ ok: true });
    }, {
        cookieName: "userInfo",
        password: process.env.IRON_SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production"
        },
    }
)