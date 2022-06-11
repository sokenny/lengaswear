import React from "react";
import Head from "next/head";
import { useAppContext } from "contexts/AppContext";
import Nav from "../modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";
import AppModal from '@/components/modules/AppModal/AppModal';

type Props = {
    nav?: React.ReactNode,
    footer?: React.ReactNode,
    children: React.ReactNode
}

const MainLayout: React.FC<Props>  = ({nav, footer, children}) => {

    const { modal } = useAppContext()

    return (
        <div>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            {nav ? nav : <Nav />}
            <AppModal />
            {children}
            {footer ? footer : <Footer />}
        </div>
    )
}

export default MainLayout;