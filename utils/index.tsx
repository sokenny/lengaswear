import { useState, useEffect, useRef } from "react";
import { SpecType } from "types";

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

export const useScrolledBottom = ():boolean => {
    const [scrolledBottom, setScrolledBottom] = useState<boolean>(false)
    const scrollPosition = useScrollPosition();
    useEffect(()=>{
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;
        const scrolledBottomPosition = bodyHeight - windowHeight;
        const isScrolledBottom = (scrollPosition - scrolledBottomPosition) > -5;
        setScrolledBottom(isScrolledBottom)
    }, [scrollPosition])
    return scrolledBottom;
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
    return string?.charAt(0)?.toUpperCase() + string?.slice(1, string.length)
}

export const useIsMobile = ():{} => {
    const [isMobile, setIsMobile] = useState<boolean>((typeof window !== 'undefined' && window.innerWidth <= 800));
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

export const tryLocalStorage = {
    ERROR_MESSAGE: 'Error occured. Possibly localStorage is either blocked or not supported.',
    get: (key:string) => {
        try{
            const contents = localStorage.getItem(key);
            if(typeof contents === 'string'){
                return JSON.parse(contents)
            }
            return false
        }catch(e){
            console.log(tryLocalStorage.ERROR_MESSAGE, e)
            return false
        }
    },
    set: (key:string, value:string | number | {}) => {
        try{
            return localStorage.setItem(key, JSON.stringify(value))
        }catch(e){
            console.log(tryLocalStorage.ERROR_MESSAGE, e)
            return false
        }
    }   
}

export const categories = ["relojes", "billeteras"]

export const formatNumber = (x:number):string => {
    if(x !== undefined){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return ""
}

export const provincias = ["Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman"]
export const fuentes = [
    {label: "Me lo mostró un amigx", value: "Referido"},
    {label: "Instagram", value: "Instagram Ads"},
    {label: "Facebook", value: "Facebook Ads"},
    {label: "YouTube", value: "YouTube"},
    {label: "Lo refirió un influencer", value: "Influencer"},
    {label: "Prensa", value: "Prensa"},
    {label: "Otro", value: "Otro"}
]

export const useFirstRender = () => {
    const isFirstRender = useRef(true);
    useEffect(() => {
        isFirstRender.current = false;
    }, []);
    return isFirstRender.current;
};

export const getMotionProps = (variant:"slideVertical", isIntersecting=true, config:any={}) => {
    const getValue = (defaultValue:number) => config.value ? config.value : defaultValue
    const variants = {
        slideVertical: {
            initial: {opacity: 0, y: getValue(30)},
            animate: isIntersecting && {opacity: 1, y: 0},
            exit: {opacity: 0, y: getValue(30)},
            transition: {duration: 1, ease: "easeOut"}
        }
    }
    Object.keys(variants[variant]).map(function(key) {
        if(key === "initial" || key === "animate" || key === "exit" || key === "transition"){
            variants[variant][key] = {...variants[variant][key], ...config};
        }
    })
    const motionProps = variants[variant]
    return motionProps
}

const months = {
    spanish: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
} 

export const constructDate = (date:Date):string => {
    const day = date.getDate()
    const month = months["spanish"][date.getMonth()]
    return `${day} de ${month}`
}

export const emailIsValid = (email:string):boolean => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
}

export const specs:SpecType[] = [
    {label: "Madera", value: "Lenga", products: ["quemanta"]},
    {label: "Madera", value: "Guayubira", products: ["tesh"]},
    {label: "Madera", value: "Moradillo", products: ["mahai"]},
    {label: "Madera", value: "Cancharana", products: ["jauke"]},
    {label: "Peso", value: "22g", products: ["quemanta", "tesh", "jauke", "mahai"]},
    {label: "Material", value: "Cuero genuino", products: ["chocolate", "suela", "boom"]},
]

export const productPageCopy:any = {
    billeteras: {
        chocolate: [
            {title: "La simpleza de Lengas en una billetera", description: "Llevamos las tolerancias al mínimo, logrando el punto óptimo entre confort y funcionalidad. Altamente práctica y a prueba de chupín."}
        ],
        suela: [
            {title: "La simpleza de Lengas en una billetera", description: "Llevamos las tolerancias al mínimo, logrando el punto óptimo entre confort y funcionalidad. Altamente práctica y a prueba de chupín."}
        ],
        boom: [
            {title: "La simpleza de Lengas en una billetera", description: "Llevamos las tolerancias al mínimo, logrando el punto óptimo entre confort y funcionalidad. Altamente práctica y a prueba de chupín."}
        ],
    },
    relojes: {
        quemanta: [
            {title: "Etimología", description: "'Quemanta': Espíritu del arbol vivo dentro de la mitología Ona. Quemanta viste de cortezas, ramas y hojas de las lengas. El mismo árbol sobre el cual esta forjado este reloj."}
        ],
        tesh: [
            {title: "Etimología", description: "'Tesh': Derivado del término 'Raíz' en la lengua Selk'nam. Un objeto arraigado a la tierra y los valores que la preservan. Manifestando su significado en el marcado trazo de sus vetas."}
        ],
        jauke: [
            {title: "Etimología", description: "'Jauke': Proveniente de la palabra 'Fuego' en la lengua Selk'nam. Le atribuimos a nuestra pieza en cancharana este título por la resonancia de su significado con las alucinantes vetas rojizas que expone."}
        ],
        mahai: [
            {title: "Etimología", description: "'Mahai': Connotación de 'Espíritu' en la lengua Selk'nam. Denominado a partir de los increíbles tonos de magenta que luce. Una tonalidad mística que terminó por establecer su nombre."}
        ],
    }
}