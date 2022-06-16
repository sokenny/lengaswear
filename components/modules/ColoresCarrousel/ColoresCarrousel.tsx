
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useOnScreen } from "@/utils/index";
import { AugmentedSwiperProps } from "types";
import { ANIMATE_BREAKPOINT } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
import styles from './ColoresCarrousel.module.scss';

SwiperCore.use([Pagination, Autoplay]);

const ColoresCarrousel:React.FC<{billetera:string, showPagination?:false}> = ({billetera, showPagination=false}) => {
    
    const carrouselRef =  useRef<any>(null)
    const swiperRef = useRef<any>(null)
    const slides = ["frente","abierto","costado","detalle"].map((foto)=> `/billeteras/${billetera}/${foto}.webp`)
    const SwiperWRef:React.FC<AugmentedSwiperProps> = Swiper
    const carrouselIntersecting = useOnScreen(carrouselRef, ANIMATE_BREAKPOINT) 

    useEffect(()=>{
        if(carrouselIntersecting) {
            (swiperRef.current !== null) && swiperRef.current.swiper.autoplay.start()
        }else{
            (swiperRef.current !== null) && swiperRef.current.swiper.autoplay.stop()
        }
    }, [carrouselIntersecting])

    return (
        <div className={`${styles.ColoresCarrousel}`} ref={carrouselRef}>
            <SwiperWRef 
            ref={swiperRef}
            pagination={showPagination}
            slidesPerView={1.2}
            spaceBetween={5}
            centeredSlides={true}
            autoplay={{delay: 1500}}
            className="noPagination ColoresCarrousel">
                {slides.map((slide, i)=>
                    <SwiperSlide key={i}>
                        <Image src={slide} height={600} width={522} alt={billetera} />
                    </SwiperSlide>
                )}
            </SwiperWRef>
        </div>
    )
}

export default ColoresCarrousel;