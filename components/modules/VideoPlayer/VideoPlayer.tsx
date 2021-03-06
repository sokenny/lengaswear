import { useIsMobile } from '@/utils/index';
import styles from './VideoPlayer.module.scss';

const VideoPlayer:React.FC<{src: string}> = ({src}) => {

    const isMobile = useIsMobile();
        
    return (
        <>
        <div 
        className={styles.VideoPlayer}
        >
            <div
            onClick={(e)=>e.stopPropagation()}
            >
                <video 
                src={src}
                controls={true}
                autoPlay={true}
                playsInline={true}
                width={isMobile ? "" : 1141}
                height={isMobile ? "" : 641}
                >
                </video>
            </div>
        </div>
        </>
    )
}

export default VideoPlayer;