import { TestimonialsType } from 'pages';
import { star } from '@/utils/icons';
import styles from './Testimonials.module.scss';

type TestimonialsProps = {
    testimonials: TestimonialsType,
}

const Testimonials:React.FC<TestimonialsProps> = ({testimonials}) => {
    return (
        <section className={styles.Testimonials}>
            <div>
                <h3>¿Qué opinan los que usan Lengas?</h3>
                <div className={styles.section}>
                    <div className={styles.set}>
                        {testimonials.map((testimonial, index)=>
                            <div className={styles.testimonial}>
                                <div className={styles.stars}>{
                                    [...Array(5)].map((_, i)=>
                                        <div>{star(20, testimonial.stars>=i+1 ? "gold" : "lightgray")}</div>
                                    )}
                                </div>
                                <div className={styles.quote}>{testimonial.quote}</div>
                                <div className={styles.name}>{testimonial.name}</div>
                                <div className={styles.location}>{testimonial.location}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;