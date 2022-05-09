import { TestimonialsType } from 'pages';
import { useIsMobile } from '@/utils/index';
import { star } from '@/utils/icons';
import styles from './Testimonials.module.scss';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
SwiperCore.use([Pagination]);

type TestimonialsProps = {
    testimonials: TestimonialsType,
}

const Testimonials:React.FC<TestimonialsProps> = ({testimonials}) => {

    const isMobile = useIsMobile();

    return (
        <section className={styles.Testimonials}>
            <div>
                <h3>¿Qué opinan los que usan Lengas?</h3>
                <div className={styles.section}>
                    {/* <div className={styles.set}>
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
                    </div> */}
                    <div className={styles.set}>
                        <Swiper 
                        pagination={true}
                        slidesPerView={isMobile ? 1 : 3}
                        spaceBetween={15}
                        className="">
                            {testimonials.map((testimonial, i)=>
                                <SwiperSlide key={testimonial.name}>
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
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;