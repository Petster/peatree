export const sessionOptions = {
    cookieName: "Peetrea",
    password: process.env.IRON_SECRET,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    }
}