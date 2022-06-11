import { useState, useRef, useEffect } from 'react';
import { useAppContext } from 'contexts/AppContext';
import { emailIsValid } from '@/utils/index';
import { NewsletterInput } from '../Newsletter/Newsletter';
import { joinWaitingList } from 'api';
import styles from './ModalWaitingList.module.scss';

const ModalWaitingList:React.FC<{product: string}> = ({product}) => {
    
    const { setModal } = useAppContext()
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [hint, setHint] = useState<string>("");
    const timeoutRef = useRef<number | null>(null)

    useEffect(()=>{
        return () => { typeof timeoutRef.current === "number" && clearTimeout(timeoutRef.current)}
    }, [])

    async function handleSubmit(){
        if(emailIsValid(email)){
            setLoading(true)
            const res = await joinWaitingList({email, product})
            if(res.data.status === "success"){
                setEmail("")
                setHint("Añadido con éxito!")
                timeoutRef.current = window.setTimeout(() => {
                    setModal(false)
                }, 2000);
            }
            setEmail("")
        }else{
            setHint("Por favor ingresa un mail válido.")
        }
        setLoading(false)
    }

    return (
            <div className={styles.ModalWaitingList}>
                <div className={styles.header}>
                    <div>Fuera de stock</div>
                    <div>Dejanos tu mail para entrar a la lista de espera y ser notificado cuando repongamos stock.</div>
                </div>
                <div>
                    <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
                        <NewsletterInput email={email} setEmail={(val:any)=>setEmail(val)} hint={hint} loading={loading} />
                    </form>
                </div>
            </div>
    )
}

export default ModalWaitingList;