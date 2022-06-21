import React, { useEffect, useState } from 'react';
import { tryLocalStorage, useScrolledBottom, useFirstRender } from "@/utils/index";
import { getStore } from 'api';
import { useMemo } from "react";
import { ProductType, CheckoutType, ConfigType } from 'types';

interface AppContextInterface {
    scrolledBottom: boolean;
    store: {products: ProductType[], config: ConfigType};
    checkout: CheckoutType;
    setCheckout: (checkout:any)=> void;
    addToCart: (prdName: string) => boolean;
    removeFromCart: (prdName: string, all?:boolean) => void;
    modal: React.ReactNode | false,
    setModal: (modal:React.ReactNode) => void
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

    useEffect(()=>{
        console.log('Checkout: ', checkout)
    })

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
            setModal
        }
    }, [scrolledBottom, store, checkout, modal]);
    
    return <AppContext.Provider value={value} {...props} />
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
}