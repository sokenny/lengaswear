import { useState } from 'react';
import { subscribe } from 'api';
import { motion } from 'framer-motion';
import { getMotionProps } from '@/utils/index';
import ArrowInput from '@/components/elements/ArrowInput/ArrowInput';
import AssetAndText from '../AssetAndText/AssetAndText';
import styles from './Newsletter.module.scss';

const Newsletter:React.FC = () => {
    
    const [email, setEmail] = useState<string>("")
    const [hint, setHint] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(){
        setLoading(true)
        const res = await subscribe(email)
        setLoading(false)
        if(res.data.status === "success"){
            setHint("Suscrito con éxito!")
            setEmail("")
        }
    }

    return (
        <section className={styles.Newsletter}>
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
                <AssetAndText assetLeft={false} title="Suscribite a nuestro Newsletter!" description="Mantenete informado acerca de nuevos lanzamientos y novedades sobre el impacto que nuestro proyecto está generando. (agregaria algo sobre dtos para incentivar)" asset="/reloj-patagonia-madera-argentina.webp" ctaSection={<NewsletterInput email={email} setEmail={(val:any)=>setEmail(val)} hint={hint} loading={loading} />} />
            </form>
        </section>
    )
}

const NewsletterInput:React.FC<{email:string, setEmail(val:string):void, hint:string, loading:boolean}> = ({email, setEmail, hint, loading}) => {
    return (
        <div className={styles.NewsletterInput}>
            <ArrowInput value={email} type="email" placeholder="Tu mail" onChange={(val:any)=>setEmail(val)} loading={loading} />
            <div className={styles.message}>
                <motion.div
                {...getMotionProps("slideVertical", hint !== "", {value: 10, duration: .25})}
                >
                    {hint}
                </motion.div>
            </div>
        </div>
    )
}

export default Newsletter;