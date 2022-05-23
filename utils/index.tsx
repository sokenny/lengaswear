import { useState, useEffect } from "react";

export const colors:{} = {
    gold: '#BC8C3E',
    white: '#ffffff',
    gray: '#757575',
    lightgray: '#E5E5E5',
    black: '#000000',
    chocolate: '#433A31',
    suela: '#94572B',
    boom: '#7A2625',
}

export const useScrollPosition = ():number => {
    const[scrollPosition, setScrollPosition] = useState<number>(0)
    function updateScroll(){
        const position = window.pageYOffset;
        setScrollPosition(position);
    }
    useEffect(()=>{
        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, [])
    return scrollPosition;
}

export const useOnScreen = (ref:React.RefObject<HTMLDivElement>, percentage:number=0):boolean => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false)
    let observer:any;
    const ioConfiguration = {
        rootMargin: `-${percentage}% 0% -${percentage}% 0%`,
        threshold: 0
    };
    useEffect(()=>{
        try{
            observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), ioConfiguration)
        }catch(e){
            console.log('Intersection observer is not available. Browser does not support it.')
            setIntersecting(false)
        }

        try{
            observer.observe(ref.current)
        }catch(e){
            console.log('Intersection observer failed: ', e)
        }
        return () => { observer.disconnect() }
    }, [])
    return isIntersecting
}

export function capitalize (string:string): string {
    return string.charAt(0).toUpperCase() + string.slice(1, string.length)
}

export const useIsMobile = ():{} => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
      const handleResize = ():void => { setIsMobile(window.innerWidth <= 800) }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}

export const scrollTo = (ref:React.RefObject<HTMLDivElement>, yOffset=0, side="top") => {
    const element:any = ref.current;
    const y = element.getBoundingClientRect()[side] + window.pageYOffset + yOffset - (side === "bottom" ? window.innerHeight : 0);
    try{
        window.scrollTo({top: y, behavior: 'smooth'});
    }catch(e:any){
        console.log('An error occured inside scrollTo function. Probably the window object can not be accessed: ', e.message)
    }
}

export const variants = {
    slideUp: {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0
        }
    },
    scaleUp: {
        hidden: {
            scale: .8,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1
        }
    }
}