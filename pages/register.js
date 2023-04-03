import React, {useState} from 'react';
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from 'next/router'

const Register = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registerHandler = (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        setError("");

        try {
            if(!formData.username || !formData.email || !formData.password || !formData.confirmpassword) {
                throw new Error('Please fill all required fields!')
            }

            if(formData.password !== formData.confirmpassword) {
                throw new Error('Password\'s do not match!')
            }

            if(!emailPattern.test(formData.email)) {
                throw new Error("Email does not match pattern example@example.com");
            }

            if(formData.password.length < 8) {
                throw new Error("Password must be 8 characters long");
            }

            if(!passwordPattern.test(formData.password)) {
                throw new Error("Password must be atleast 8 characters long with 1 capital, 1 number, and 1 symbol");
            }

            postData(formData);
        } catch (e) {
            setError(e.message);
        }

        console.log(formData);
    }

    const postData = async (formData) => {
        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            let data = await res.json();

            if(!res.ok) {
                throw new Error(data.message)
            }

            Swal.fire({
                icon: 'success',
                title: data.message
            }).then(() => {
                router.push('/login')
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
                <form className={'p-2'} onSubmit={registerHandler}>
                    <div className={'flex flex-col gap-4'}>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'username'}>Username</label>
                            <input className={'text-black p-1'} name={'username'} id={'username'} type={'text'} value={formData.username} onChange={(e) => {setFormData({...formData, username: e.target.value})}} />
                        </div>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'email'}>Email</label>
                            <input className={'text-black p-1'} name={'email'} id={'email'} type={'email'} value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}} />
                        </div>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'password'}>Password</label>
                            <div className={'flex flex-row items-center gap-2'}>
                                <input className={'text-black p-1'} name={'password'} id={'password'} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}} />
                                <div onMouseDown={() => {setShowPassword(true)}} onMouseUp={() => {setShowPassword(false)}} className={'text-fuchsia-900 hover:text-fuchsia-600 cursor-pointer absolute right-7 p-1'}><FontAwesomeIcon icon={faEye} /></div>
                            </div>
                        </div>
                        <div className={'flex flex-row gap-4 justify-between content-center items-center'}>
                            <label className={'select-none'} htmlFor={'confirmpassword'}>Confirm Password</label>
                            <div className={'flex flex-row items-center gap-2'}>
                                <input className={'text-black p-1'} name={'confirmpassword'} id={'password'} type={showConfirmPassword ? "text" : "password"} value={formData.confirmpassword} onChange={(e) => {setFormData({...formData, confirmpassword: e.target.value})}} />
                                <div onMouseDown={() => {setShowConfirmPassword(true)}} onMouseUp={() => {setShowConfirmPassword(false)}} className={'text-fuchsia-900 hover:text-fuchsia-600 cursor-pointer absolute right-7 p-1'}><FontAwesomeIcon icon={faEye} /></div>
                            </div>
                        </div>
                        <div className={'flex flex-row gap-4 justify-between'}>
                            <Link href={'/login'} className={'flex flex-grow justify-center content-center items-center p-2 bg-fuchsia-700 text-white hover:bg-fuchsia-900 rounded-md'} type={'button'}>Login</Link>
                            <button className={'flex flex-grow justify-center content-center items-center p-2 bg-lime-700 text-white hover:bg-lime-900 rounded-md'} type={'submit'}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
