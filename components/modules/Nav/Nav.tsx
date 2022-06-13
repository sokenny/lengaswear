import { useEffect, useState } from "react";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollPosition, useScrolledBottom, constructDate } from "@/utils/index";
import { WHATSAPP_LINK } from "@/utils/constants";
import { cart, hamburger } from "@/utils/icons";
import { useRouter } from "next/router";
import styles from './Nav.module.scss';

interface NavProps {
    theme?: string,
    whiteFooter?: boolean,
}

const Nav:React.FC<NavProps> = ({theme, whiteFooter}) => {

    const { checkout } = useAppContext();
    const scrollPosition = useScrollPosition();
    const hasScrolled = scrollPosition > 0;
    const scrolledBottom = useScrolledBottom();
  
    return (
        <div className={`${styles.Nav} ${(hasScrolled || theme === "scrolled") ? styles['Nav-scrolled'] : ''} ${scrolledBottom ? styles['Nav-scrolledBottom'] : ''} ${whiteFooter ? styles['Nav-whiteFooter'] : ''}`}>
            <MobileNav carrito={checkout?.carrito || []} hasScrolled={hasScrolled} />
            <DesktopNav carrito={checkout?.carrito || []} hasScrolled={hasScrolled} />
        </div>
    )
}

const mobileTabs:{label: string, route:string}[] = [{label: 'Relojes', route: '/relojes'}, {label: 'Billeteras', route: '/billeteras'}, {label: 'Carrito', route: '/carrito'}]; 

const MobileNav:React.FC<{carrito: string[], hasScrolled: boolean}> = ({carrito, hasScrolled}) => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(()=>{
        const handleRouteComplete = () => { setIsOpen(false) }
        router.events.on('routeChangeComplete', handleRouteComplete)
        return () => {
            router.events.off('routeChangeComplete', handleRouteComplete)
        }
    }, [router.events])

    return (
        <nav className={`${styles.MobileNav} ${isOpen ? styles['MobileNav-isOpen'] : ''}`} onClick={()=>setIsOpen(false)}>
            <div>
                <StatusBar show={hasScrolled} />
                <div className={styles.MobileNav__hamburger} onClick={(e)=>{e.stopPropagation(), setIsOpen(!isOpen)}}>{hamburger()}</div>
                <div className={styles.MobileNav__logo}>
                    <Link href="/">
                        <img src="/lengas.png" alt="Lengas logo" />
                    </Link>
                </div>
                <div className={styles.MobileNav__cart}>
                    <Link href="/carrito">
                        <a>
                            <CartLength carrito={carrito} />
                        </a>
                    </Link>
                </div>
            </div>
            <AnimatePresence>
            {isOpen &&
            <motion.div className={styles.MobileNav__dropDown} onClick={(e)=>e.stopPropagation()} initial={{y: -20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} transition={{ease: "easeOut", stiffness: 0, duration: .15}} >
                <div>
                    <ul>
                        {mobileTabs.map((tab, i)=>
                            <Link href={tab.route} key={tab.label}>
                            <motion.li 
                            className={tab.route === router.route ? styles['tab-active'] : ''}
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            transition={{delay: i*.05}}
                            >
                                {tab.label}
                            </motion.li>
                            </Link>
                        )}
                    </ul>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                        <div>Necesitás ayuda? Chatea con nosotros!</div>
                    </a>
                </div>
            </motion.div>
            }
            </AnimatePresence>
        </nav>
    )
}

const DesktopNav:React.FC<{carrito: string[], hasScrolled: boolean}> = ({carrito, hasScrolled}) => {

    const router = useRouter();

    return (
        <nav className={`${styles.DesktopNav}`}>
            <div>
                <StatusBar show={hasScrolled} />
                <div>
                    <div className={styles.DesktopNav__logo}>
                        <Link href="/">
                            <a>
                                <img src="/lengas.png" alt="Lengas logo" height={30} />
                            </a>
                        </Link>
                    </div>
                    <ul>
                        <Link href="/relojes">
                            <a><li
                                className={router.route === '/relojes' ? styles['tab-active'] : ''}
                                >Relojes</li></a>
                        </Link>
                        <Link href="/billeteras">
                            <a><li
                                className={router.route === '/billeteras' ? styles['tab-active'] : ''}
                                >Billeteras</li></a>
                        </Link>
                    </ul>
                </div>
                <div>
                    <ul>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><li>Contacto</li></a>
                        <a>
                            <li>
                                <img src="/flags/arg.png" height="14px" alt="Bandera Argentina" />
                            </li>
                        </a>
                        <Link href="/carrito">
                            <a>
                                <li className={router.route === '/carrito'  ? styles['tab-active'] : ''}>
                                    <div className={styles.DesktopNav__cart}>
                                        <div>
                                            <CartLength carrito={carrito} />
                                        </div>
                                        <span>
                                            {cart(undefined, "white")}
                                        </span>
                                    </div>
                                </li>
                            </a>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const StatusBar:React.FC<{show?:boolean}> = ({show=true}) => {

    const router = useRouter();
    const statusBarRoutes = ['/', '/relojes/[reloj]', '/billeteras/[billetera]'];
    const { store } = useAppContext();
    const preOrderDate = store?.config?.preOrderDate ? constructDate(new Date(store.config.preOrderDate)) : ""

    return (
        <AnimatePresence>
        {(show && statusBarRoutes.includes(router.route) && preOrderDate !== "") &&
        <div 
        className={styles.StatusBar}
        data-component="StatusBar"
        >
            <motion.div
            initial={{opacity: 0, y: -5}}
            animate={{opacity: 1, y: 0, transition: {delay: .25, stiffness: 0}}}
            exit={{opacity: 0, y: -5, transition: {duration: .25}}}
            >
                <div className={styles.message}>Pre venta abierta - DESPACHANDO TODOS SUS PEDIDOS EL <span>{preOrderDate}</span></div>
            </motion.div>
        </div>
        }
        </AnimatePresence>
    )
}

const CartLength:React.FC<{carrito: string[]}> = ({carrito}) => {
    return (
        <div className={styles.CartLength}>
            <motion.div
            key={carrito.length}
            initial={{rotateY: 0}}
            animate={{rotateY: 360, scale: [1, 1.5, 1], transition:{duration: .35}}}
            >
                {carrito.length}
            </motion.div>
        </div>
    )
}

export default Nav;