import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { useAppContext } from "contexts/AppContext";
import { emailIsValid, useIsMobile, tryLocalStorage, getMotionProps } from "@/utils/index";
import { subscribeToNewsletter } from "api";
import Image from "next/image";
import Input from "@/components/elements/Input/Input";
import Button from "@/components/elements/Button/Button";
import styles from './ModalNewsletter.module.scss'

const ModalNewsletter:React.FC = () => {

    const { setModal } = useAppContext();
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [hint, setHint] = useState<string>("");
    const timeoutRef = useRef<number | null>(null)

    useEffect(()=>{
        tryLocalStorage.set('shownModalNewsletter', true)
        return () => { typeof timeoutRef.current === "number" && clearTimeout(timeoutRef.current)}
    }, [])

    const canSubmit = name!=="" && emailIsValid(email)

    async function handleSubmit(){
        if(emailIsValid(email)){
            setLoading(true)
            const res = await subscribeToNewsletter({name, email})
            setLoading(false)
            if(res.data.status === "success"){
                setHint("Suscrito con éxito!")
                clearInputs()
                timeoutRef.current = window.setTimeout(() => {
                    setModal(false)
                }, 2000);
            }
        }else{
            setHint("Por favor ingresa un mail válido.")
        }
    }

    function clearInputs(){
        setEmail("")
        setName("")
    }

    return (
        <div className={styles.ModalNewsletter}>
            {!isMobile &&
            <div className={styles.image}>
                <Image src="/modal-newsletter.webp" layout="fill" objectFit="cover" priority={true} />
            </div>
            }
            <div className={styles.text}>
                <div className={styles.header}>
                    <div>Accedé a <span>3</span> y <span>6</span> cuotas <span>sin interés!</span></div>
                    <p>Suscribite a nuestro newsletter para acceder a este beneficio. Al momento de pagar vas a tener la opcion de abonar en cuotas.</p>
                </div>
                <form onSubmit={(e)=>{e.preventDefault(), handleSubmit()}}>
                    <div>
                        <Input value={name} type="text" name="first-name" onChange={(name)=>typeof name === "string" && setName(name)} placeholder={"Ryan Gosling"} />
                        <Input value={email} type="email" name="email" onChange={(email)=>typeof email === "string" && setEmail(email)} placeholder={"ryangosling@mail.com"} />
                    </div>
                    <Button onClick={()=>{}} active={canSubmit} loading={loading}>Acceder a beneficio</Button>
                </form>
                <div className={styles.hint}>
                <motion.div
                {...getMotionProps("slideVertical", hint !== "", {value: 10, duration: .25})}
                >
                    {hint}
                </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewsletter;