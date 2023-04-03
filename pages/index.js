import Layout from "../components/Layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
    async function({req, res}) {
        const { user } = req.session

        if(user) {
            return {
                props: { user }
            }
        }

        return {
            props: {  }
        }
    }, sessionOptions
)

const Index = ({user}) => (
    <Layout col={true}>
        <h1 className={'text-white'}>Hey {user?.username || ""}</h1>
        <p>{user?.email || ""}</p>
        <p>{user?.token.split('.')[0] || ""}</p>
        <p>{user?._id || ""}</p>
        <p>{user?.isAdmin ? "Admin" : "Not Admin"}</p>
        <p>{user?.isLoggedIn ? "Logged" : "Not Logged"}</p>
    </Layout>
)

export default Index