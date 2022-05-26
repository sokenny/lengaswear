import { useState } from 'react';
import ArrowInput from '@/components/elements/ArrowInput/ArrowInput';
import AssetAndText from '../AssetAndText/AssetAndText';
import styles from './Newsletter.module.scss';

const Newsletter:React.FC = () => {
    const [email, setEmail] = useState<string>("")
    return (
        <section className={styles.Newsletter}>
            <AssetAndText assetLeft={false} title="Suscribite a nuestro Newsletter!" description="Mantenete informado acerca de nuevos lanzamientos y novedades sobre el impacto que nuestro proyecto está generando. (agregaria algo sobre dtos para incentivar)" asset="/reloj-patagonia-madera-argentina.webp" ctaSection={<ArrowInput value={email} type="email" placeholder="Tu mail" onChange={(val:any)=>setEmail(val)} />} />
        </section>
    )
}

export default Newsletter;