import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { tryLocalStorage, useScrolledBottom, useFirstRender } from "@/utils/index";
import { getStore } from 'api';
import { ProductType, CheckoutType, ConfigType } from 'types';

interface AppContextInterface {
    scrolledBottom: boolean;
    store: {products: ProductType[], config: ConfigType};
    checkout: CheckoutType;
    setCheckout: (checkout:any)=> void;
    addToCart: (prdName: string) => boolean;
    removeFromCart: (prdName: string, all?:boolean) => void;
    modal: React.ReactNode | false,
    setModal: (modal:React.ReactNode) => void,
    cartDetail: any
}

const initialCheckoutValue:CheckoutType = {
    step: 1,
    completed: false,
    carrito: [],
    cartGrossTotal: 0,
    cartNetTotal: 0,
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
    fuente: "",
    pais: "Argentina",
    provincia: "",
    localidad: "",
    calle: "",
    numero: "",
    dpto: "",
    mpCredentials: null
} 

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props:any){

    const isFirstRender = useFirstRender();
    const scrolledBottom:boolean = useScrolledBottom();
    const [checkout, setCheckout] = useState<CheckoutType>(initialCheckoutValue)
    const [store, setStore] = useState<{products: ProductType[], config: ConfigType | {}}>({products: [], config: {}});
    const [modal, setModal] = useState<React.ReactNode | false>(false)
    const cartDetail = useMemo(()=>getCartDetail(checkout.carrito), [checkout.carrito, checkout.step]);

    useEffect(()=>{
        const cachedStore = tryLocalStorage.get("store");
        if (cachedStore.length > 0) setStore(cachedStore)
        getStore().then(res => {
            if(res.data.status === "success"){
                setStore(res.data.store)
                tryLocalStorage.set("store", res.data.store)
                const checkout = tryLocalStorage.get("checkout") || initialCheckoutValue
                setCheckout({...checkout, mpCredentials: res.data.store.config.mpCredentials})
            }
        })
    }, [])

    useEffect(()=>{
        if(!isFirstRender) tryLocalStorage.set("checkout", {...checkout, step: 1});
    }, [checkout])

    useEffect(()=>{
        if(!isFirstRender) setCheckout({...checkout, cartGrossTotal: getCartGrossTotal(), cartNetTotal: checkout.carrito.length > 1 ? Math.floor(getCartGrossTotal() * 0.9) : getCartGrossTotal()});
    }, [cartDetail, checkout.carrito])

    function getCartDetail(carrito:string[]){
        const cartDetail:any = {};
        carrito.forEach(element => {
            cartDetail[element] = (cartDetail[element] || 0) + 1;
        });
        return cartDetail;
    }

    const getCartGrossTotal = useCallback(():number => {
        let total = 0;
        if(Object.keys(cartDetail).length > 0 && store.products.length > 0){
            Object.keys(cartDetail).forEach(prdName => {
                const qty = cartDetail[prdName];
                const product:ProductType = store.products.filter((prd:any)=>prd.name.toLowerCase() === prdName.toLowerCase())[0];
                total += qty * product.price;
            });
        }
        return total;
    }, [cartDetail, checkout.carrito, store]);

    function addToCart(prdName:string){
        const productAdded:any = store.products.find((product) => product.name === prdName)
        if(productAdded.stock > 0){
            setCheckout({...checkout, carrito: [...checkout.carrito, prdName]});
            return true
        }
        return false
    }

    function removeFromCart(prdName: string, all: boolean = false){
        if(all){
            setCheckout({...checkout, carrito: checkout.carrito.filter((prd:string)=> prd !== prdName)});
        }else{
            const index = checkout.carrito.indexOf(prdName);
            if (index !== -1) {
                checkout.carrito.splice(index, 1)
                setCheckout({...checkout, carrito: [...checkout.carrito]});
            }
        }
    }

    const value = useMemo(()=>{
        return {
            store,
            scrolledBottom,
            checkout,
            setCheckout,
            addToCart,
            removeFromCart,
            modal,
            setModal,
            cartDetail
        }
    }, [scrolledBottom, store, checkout, modal, cartDetail]);
    
    return <AppContext.Provider value={value} {...props} />
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
}