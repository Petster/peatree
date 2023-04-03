import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

const Header = () => {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    const navItems = [
        {
            display: 'Home',
            link: '/',
            logged: false
        }
    ]

    const linkStyles = 'border-b border-black hover:text-red-400';

    const logoutHandler = async(e) => {
        e.preventDefault();
        mutateUser(
            await fetchJson('/api/users/logout', {
                method: 'POST'
            }),
            false
        );
        await router.push('/login');
    }

    return (
        <div className={'flex flex-row p-4 gap-4 content-center items-center justify-between'}>
            <div className={'flex flex-row gap-4 content-center items-center justify-center'}>
                {navItems?.map((da) =>
                    <Link key={da.display} href={da.link} className={linkStyles}>{da.display}</Link>
                )}
            </div>
            <div className={'flex flex-row gap-4 content-center items-center justify-center'}>
                {user?.isLoggedIn === true && (
                    <p onClick={logoutHandler} className={`${linkStyles} cursor-pointer`}>Logout</p>
                )}
                {user?.isLoggedIn === false && (
                    <>
                        <Link className={linkStyles} href={'/login'}>Login</Link>
                        <Link className={linkStyles} href={'/register'}>Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header