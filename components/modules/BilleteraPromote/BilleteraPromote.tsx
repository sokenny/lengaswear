import { useState } from "react";
import { useAppContext } from "contexts/AppContext";
import { motion } from "framer-motion";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import styles from './BilleteraPromote.module.scss';

const BilleteraPromote:React.FC = () => {

    const { setModal } = useAppContext();
    const showVideo = () => setModal(<VideoPlayer src="/billeteras/promo-billetera.mp4" />)
    const [previewSrc, setPreviewSrc] = useState("");

    return (
        <motion.section 
        className={styles.BilleteraPromote} onClick={showVideo}
        onViewportEnter={()=>setPreviewSrc("/billeteras/preview-promo-billetera.mp4")}
        >
            <div className={styles.content}>
                <h3>Mucho menos que una billetera</h3>
                <div className={styles.cta}>VER VIDEO</div>
            </div>            
            <div className={styles.overlay}></div>
            <div className={styles.videoPreview}>
                <video 
                poster="/billeteras/poster-promo-billetera.webp"
                autoPlay={true}
                playsInline={true}
                controls={false}
                muted={true}
                loop={true}
                src={previewSrc}
                />
            </div>
        </motion.section>
    )
}

export default BilleteraPromote;