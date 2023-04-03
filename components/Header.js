import React from 'react';
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Header = () => {

    const router = useRouter();
    const linkStyles = 'border-b border-black hover:text-red-400';

    const logoutHandler = async() => {
        try {
            const res = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            let data = await res.json();

            if(!res.ok) {
                console.log(data.message);
            }

            Swal.fire({
                icon: 'success',
                title: 'Logged out'
            }).then(() => {
                router.push('/login');
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'flex flex-row p-4 gap-4 content-center items-center justify-center'}>
            <Link className={linkStyles} href={'/'}>Home</Link>
            <Link className={linkStyles} href={'/login'}>Login</Link>
            <Link className={linkStyles} href={'/register'}>Register</Link>
            <p onClick={logoutHandler} className={`${linkStyles} cursor-pointer`}>Logout</p>
        </div>
    );
};

export default Header;
