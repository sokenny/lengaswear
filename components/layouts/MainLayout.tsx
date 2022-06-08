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
            </Head>
            {nav ? nav : <Nav />}
            {children}
            {footer ? footer : <Footer />}
        </div>
    )
}

export default MainLayout;