import { useState } from "react";
import { useAppContext } from "contexts/AppContext";
import { emailIsValid } from "@/utils/index";
import { subscribeToNewsletter } from "api";
import { NewsletterInput } from "../Newsletter/Newsletter";
import Image from "next/image";
import Input from "@/components/elements/Input/Input";
import Button from "@/components/elements/Button/Button";
import styles from './ModalNewsletter.module.scss'

const ModalNewsletter:React.FC = () => {

    const { setModal } = useAppContext()
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [hint, setHint] = useState<string>("");

    const canSubmit = name!=="" && emailIsValid(email)

    async function handleSubmit(){
        if(emailIsValid(email)){
            setLoading(true)
            const res = await subscribeToNewsletter({name, email})
            setLoading(false)
            if(res.data.status === "success"){
                setHint("Suscrito con éxito!")
                clearInputs()
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
            <div className={styles.image}>
                <Image src="/modal-newsletter.webp" layout="fill" objectFit="cover" priority={true} />
            </div>
            <div className={styles.text}>
                <div className={styles.header}>
                    <div>Accedé a 3 y 6 cuotas sin interés!</div>
                    <p>Suscribite a nuestro newsletter para acceder a este beneficio. Al momento de pagar vas a tener la opcion de abonar en cuotas.</p>
                </div>
                <form onSubmit={(e)=>{e.preventDefault(), handleSubmit()}}>
                    <div>
                        <Input value={name} type="text" name="first-name" onChange={(name)=>typeof name === "string" && setName(name)} placeholder={"Ryan Gosling"} />
                        <Input value={email} type="email" name="email" onChange={(email)=>typeof email === "string" && setEmail(email)} placeholder={"ryangosling@mail.com"} />
                    </div>
                    <Button onClick={()=>{}} active={canSubmit} loading={loading}>Acceder a beneficio</Button>
                </form>
            </div>
        </div>
    )
}

export default ModalNewsletter;