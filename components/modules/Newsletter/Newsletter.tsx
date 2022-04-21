import { useState } from 'react';
import { arrow } from '@/utils/icons';
import AssetAndText from '../AssetAndText/AssetAndText';
import styles from './Newsletter.module.scss';

const EmailInput:React.FC<{email:string, onChange:(val:string)=>void}> = ({email, onChange}) => {
    return (
        <div className={styles.EmailInput}>
            <input type="email" value={email} placeholder="Tu Email" onChange={(e)=>onChange(e.target.value)} />
            <div>{arrow(25, "gray")}</div>
        </div>
    )
}   

const Newsletter:React.FC = () => {

    const [email, setEmail] = useState<string>("")

    return (
        <section className={styles.Newsletter}>
            <AssetAndText assetLeft={false} title="Suscribite a nuestro Newsletter!" description="Mantenete informado acerca de nuevos lanzamientos y novedades sobre el impacto que nuestro proyecto está generando. (agregaria algo sobre dtos para incentivar)" image="/reloj-patagonia-madera-argentina.webp" ctaSection={<EmailInput email={email} onChange={setEmail} />} />
        </section>
    )
}

export default Newsletter;