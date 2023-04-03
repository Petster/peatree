import Layout from "../components/Layout";
import { sessionOptions } from "../lib/session";
import {withSessionSsr} from "../lib/withSession";

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;

        if(user === undefined) {
            return {
                props: {
                    user: { isLoggedIn: false }
                }
            }
        }

        return {
            props: {
                user: { isLoggedIn: true, userInfo: req.session.user}
            }
        }
    }, sessionOptions
)

const Index = ({user}) => (
  <Layout col={true}>
    <h1 className={'text-red-500'}>Hey {user?.isLoggedIn ? user.userInfo.username : ""}</h1>
  </Layout>
)

export default Index
