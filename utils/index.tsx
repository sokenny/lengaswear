import { useState, useEffect } from "react";

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

export const useOnScreen = (ref:React.RefObject<HTMLDivElement>):boolean => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false)
    let observer:any;
    useEffect(()=>{
        try{
            observer = new IntersectionObserver(
                ([entry]) => setIntersecting(entry.isIntersecting)
                )
        }catch(e){
            console.log('Intersection observer is not available. Browser does not support it.')
            // We return "not available" so that truth checkers for "isInterseting" pass the check and elements are not kept hidden from the DOM. Also could be used to handle a specific scenario for a not available Observer. 
            setIntersecting("not available")
        }
    }, [])
    useEffect(() => {
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