import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from 'contexts/AppContext';
import styles from './AppModal.module.scss'

const AppModal:React.FC = () => {

    const { modal, setModal } = useAppContext();

    return (
        <AnimatePresence>
        { modal && 
        <motion.div 
        className={styles.AppModal}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: .1}}
        onClick={()=>setModal(false)}
        >
            <motion.div
            initial={{opacity: 0, scale: .8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: .8}}
            transition={{duration: .1}}
            >
                <div onClick={(e)=>e.stopPropagation()}>
                    {modal}
                </div>
            </motion.div>
        </motion.div>
        }
        </AnimatePresence>
    )
}

export default AppModal;