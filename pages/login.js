import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "../lib/session";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

export const getServerSideProps = withIronSessionSsr(
    async function({req, res}) {
        const { user } = req.session

        if(user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        return {
            props: {  }
        }
    }, sessionOptions
)

const Login = () => {
    const { mutateUser } = useUser()
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginHandler = async(e) => {
        e.preventDefault();
        setError("");

        try {
            if(!formData.username || !formData.password) {
                throw new Error('Please fill all required fields!')
            }

            mutateUser(
                await fetchJson('/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }),
                false
            ).then(() => {
                router.push('/');
            })
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <Layout col={false}>
            <div className={'flex flex-col gap-2 text-start w-full'}>
                <h1 className={'border-b border-white p-2 text-2xl'}>Registration</h1>
                {error && <div className={'flex content-center items-center justify-center p-2 rounded-md bg-rose-700 text-white'}>
                    <p>Error: {error}</p>
                </div>}
                <form className={'p-2'} onSubmit={loginHandler}>
                    <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'username'}>Username</label>
                            <input className={'text-black p-1'} name={'username'} id={'username'} type={'text'} value={formData.username} onChange={(e) => {setFormData({...formData, username: e.target.value})}} />
                        </div>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'password'}>Password</label>
                            <div className={'flex flex-row items-center gap-2'}>
                                <input className={'text-black p-1'} name={'password'} id={'password'} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}} />
                                <div onMouseDown={() => {setShowPassword(true)}} onMouseUp={() => {setShowPassword(false)}} className={'text-fuchsia-900 hover:text-fuchsia-600 cursor-pointer absolute right-7 p-1'}><FontAwesomeIcon icon={faEye} /></div>
                            </div>
                        </div>
                        <div className={'flex flex-row gap-4 justify-between'}>
                            <Link href={'/register'} className={'flex flex-grow justify-center content-center items-center p-2 bg-fuchsia-700 text-white hover:bg-fuchsia-900 rounded-md'} type={'button'}>Register</Link>
                            <button className={'flex flex-grow justify-center content-center items-center p-2 bg-lime-700 text-white hover:bg-lime-900 rounded-md'} type={'submit'}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
