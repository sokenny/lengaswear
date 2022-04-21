import Head from "next/head";
import Nav from "../modules/Nav/Nav";
import Footer from "@/components/modules/Footer/Footer";

type Props = {
    children: React.ReactNode
}

const MainLayout: React.FC<Props>  = ({children}) => {
    return (
        <div>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Silk Serif:wght@100;400&family=Manrope:wght@200;400;500&display=swap" rel="stylesheet" />
            </Head>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout;