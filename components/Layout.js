import React from 'react';
import Head from "next/head"
import Header from "./Header";

const Layout = ({title, col, children}) => {
    return (
        <>
            <Head>
                <title>{title || "Peatree"}</title>
            </Head>
            <div className={`flex flex-col flex-grow text-center mx-auto w-full`}>
                <Header />
                <div className={`flex ${col ? "flex-col" : ""} flex-grow text-white backdrop-filter backdrop-blur-md bg-black bg-opacity-40 p-4 rounded-lg`}>
                    {children}
                </div>
            </div>
        </>

    );
};

export default Layout;
