import styles from './Gallery.module.scss';

const Gallery:React.FC = () => {
    return (
        <section className={styles.Gallery}>
            <div>
                <div>
                    <h3>Uno con la naturaleza</h3>
                </div>
                <div className={styles.image}>
                    <img src="/gallery/relojes-de-madera-artesanales-1.webp" alt="" />
                </div>
                <div className={styles.image}>
                    <img src="/gallery/relojes-de-madera-artesanales-2.webp" alt="" />
                </div>
            </div>
            <div>
                <div className={styles.image}>
                    <img src="/gallery/relojes-de-madera-artesanales-3.webp" alt="" />
                </div>
                <div className={styles.image}>
                    <img src="/gallery/relojes-de-madera-artesanales-4.webp" alt="" />
                </div>
            </div>
        </section>
    )
}

export default Gallery;