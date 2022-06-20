import { AnimatePresence, motion } from 'framer-motion'
import styles from './VideoPlayer.module.scss';

const VideoPlayer:React.FC<{src: string, show: boolean, setShow: (show:boolean)=>void}> = ({src, show, setShow}) => {
        
    return (
        <>
        <AnimatePresence>
        {show &&
        <motion.div 
        className={styles.VideoPlayer}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0, transition:{delay: .15}}}
        onClick={()=>setShow(false)}
        >
            <motion.div
            initial={{opacity: 0, scale: .8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .7, transition:{duration: .2}}}
            onClick={(e)=>e.stopPropagation()}
            >
                <video 
                src={src}
                controls={true}
                autoPlay={true}
                playsInline={true}
                >
                </video>
            </motion.div>
        </motion.div>
        }
        </AnimatePresence>
        </>
    )
}

export default VideoPlayer;