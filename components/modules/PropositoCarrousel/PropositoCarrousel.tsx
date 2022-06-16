import { useRef, useEffect } from "react";
import Image from "next/image";
import { useIsMobile, useOnScreen } from "@/utils/index";
import { AugmentedSwiperProps } from "types";
import { ANIMATE_BREAKPOINT } from "@/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
SwiperCore.use([Pagination, Autoplay]);

const PropositoCarrousel:React.FC = () => {

    const isMobile = useIsMobile();
    const carrouselRef = useRef<HTMLDivElement>(null)
    const slides = ["proposito-1", "proposito-2", "proposito-3", "proposito-4"]
    const swiperRef = useRef<any>(null)
    const carrouselIntersecting = useOnScreen(carrouselRef, ANIMATE_BREAKPOINT) 
    const SwiperWRef:React.FC<AugmentedSwiperProps> = Swiper

    useEffect(()=>{
        if(carrouselIntersecting) {
            (swiperRef.current !== null) && swiperRef.current.swiper.autoplay.start()
        }else{
            (swiperRef.current !== null) && swiperRef.current.swiper.autoplay.stop()
        }
    }, [carrouselIntersecting])
    
    return (
        <div ref={carrouselRef}>
        <SwiperWRef 
        ref={swiperRef}
        pagination={true}
        slidesPerView={1.2}
        spaceBetween={15}
        autoplay={{delay: 3000}}
        className="CarrouselSection">
            {slides.map((slide, i)=>
                <SwiperSlide key={i}>
                    <div style={{position: "relative", width: "600px", height: isMobile ? "420px" : "750px"}}> 
                        <Image src={`/billeteras/${slide}.webp`} layout="fill" objectFit="contain" alt={slide} />
                    </div>
                </SwiperSlide>
            )}
        </SwiperWRef>
        </div>
    )
}

export default PropositoCarrousel;