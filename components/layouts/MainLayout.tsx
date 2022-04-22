import Head from "next/head";
import Nav from "../modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import React from "react";

type Props = {
    nav?: React.ReactNode,
    footer?: React.ReactNode,
    children: React.ReactNode
}

const MainLayout: React.FC<Props>  = ({nav, footer, children}) => {
    return (
        <div>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Silk Serif:wght@100;400&family=Manrope:wght@200;400;500&display=swap" rel="stylesheet" />
            </Head>
            {nav ? nav : <Nav />}
            {children}
            {footer ? footer : <Footer />}
        </div>
    )
}

export default MainLayout;