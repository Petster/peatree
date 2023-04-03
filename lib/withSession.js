import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
    cookieName: "Peatree",
    password: process.env.IRON_SECRET,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    }
};
export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}
export function withSessionSsr(handler) {
    return withIronSessionSsr(handler, sessionOptions);
}