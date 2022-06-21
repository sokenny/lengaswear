import styles from './VideoPlayer.module.scss';

const VideoPlayer:React.FC<{src: string}> = ({src}) => {
        
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
                width="1141"
                height="641"
                >
                </video>
            </div>
        </div>
        </>
    )
}

export default VideoPlayer;