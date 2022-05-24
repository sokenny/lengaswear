import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollPosition, useScrolledBottom } from "@/utils/index";
import { cart, hamburger } from "@/utils/icons";
import styles from './Nav.module.scss';
import { useRouter } from "next/router";

interface NavProps {
    theme?: string,
    whiteFooter?: boolean,
}

const Nav:React.FC<NavProps> = ({theme, whiteFooter}) => {

    const scrollPosition = useScrollPosition();
    const hasScrolled = scrollPosition > 0;
    const scrolledBottom = useScrolledBottom();
  
    return (
        <div className={`${styles.Nav} ${(hasScrolled || theme === "scrolled") ? styles['Nav-scrolled'] : ''} ${scrolledBottom ? styles['Nav-scrolledBottom'] : ''} ${whiteFooter ? styles['Nav-whiteFooter'] : ''}`}>
            <MobileNav />
            <DesktopNav />
        </div>
    )
}

const mobileTabs:{label: string, path:string}[] = [{label: 'Relojes', path: '/relojes'}, {label: 'Billeteras', path: '/billeteras'}, {label: 'Contacto', path: '/relojes'}, {label: 'Carrito', path: '/relojes'}]; 

const MobileNav:React.FC = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(()=>{
        const handleRouteComplete = () => { setIsOpen(false) }
        router.events.on('routeChangeComplete', handleRouteComplete)
        return () => {
            router.events.off('routeChangeComplete', handleRouteComplete)
        }
    }, [])

    return (
        <nav className={`${styles.MobileNav} ${isOpen ? styles['MobileNav-isOpen'] : ''}`} onClick={()=>setIsOpen(false)}>
            <div>
                <div className={styles.MobileNav__hamburger} onClick={(e)=>{e.stopPropagation(), setIsOpen(!isOpen)}}>{hamburger()}</div>
                <div className={styles.MobileNav__logo}>
                    <Link href="/">
                        <img src="/lengas.png" alt="Lengas logo" />
                    </Link>
                </div>
                <div className={styles.MobileNav__cart}>
                    <Link href="/carrito">
                        <a>
                            <div>0</div>
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
                            <Link href={tab.path} key={tab.label}>
                            <motion.li initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: i*.05}}>
                                {tab.label}
                            </motion.li>
                            </Link>
                        )}
                    </ul>
                    <div>Necesitas ayuda? Chateá con nosotros!</div>
                </div>
            </motion.div>
            }
            </AnimatePresence>
        </nav>
    )
}

const DesktopNav:React.FC = () => {
    return (
        <nav className={`${styles.DesktopNav}`}>
            <div>
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
                            <a><li>Relojes</li></a>
                        </Link>
                        <Link href="/billeteras">
                            <a><li>Billeteras</li></a>
                        </Link>
                    </ul>
                </div>
                <div>
                    <ul>
                        <Link href="/soporte">
                            <a><li>Soporte</li></a>
                        </Link>
                            <a>
                                <li>
                                    <img src="/flags/arg.png" height="14px" alt="Bandera Argentina" />
                                </li>
                            </a>
                        <Link href="/carrito">
                            <a>
                                <li>
                                    <div className={styles.DesktopNav__cart}>
                                        {cart(undefined, "white")}
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

export default Nav;