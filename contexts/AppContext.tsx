import React, { useEffect, useState } from 'react';
import { tryLocalStorage, useScrolledBottom, useFirstRender } from "@/utils/index";
import { getStore } from 'api';
import { useMemo } from "react";
import { ProductType, CheckoutType } from 'types';

interface AppContextInterface {
    scrolledBottom: boolean;
    store: ProductType[];
    checkout: CheckoutType;
    setCheckout: (checkout:any)=> void;
    addToCart: (prdName: string) => void;
    removeFromCart: (prdName: string, all?:boolean) => void;
}

const initialCheckoutValue:CheckoutType = {
    step: 1,
    completed: false,
    carrito: [],
    cartTotal: 0,
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
} 

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props:any){

    const isFirstRender = useFirstRender();
    const scrolledBottom:boolean = useScrolledBottom();
    const [checkout, setCheckout] = useState<CheckoutType>(initialCheckoutValue)
    const [store, setStore] = useState<ProductType[]>([]);

    useEffect(()=>{
        const cachedStore = tryLocalStorage.get("store");
        if (cachedStore.length > 0) setStore(cachedStore)
        getStore().then(res => {
            if(res.data.status === "success"){
                setStore(res.data.store)
                tryLocalStorage.set("store", res.data.store)
            }
        })
    }, [])

    useEffect(()=>{
        if(isFirstRender){
            setCheckout(tryLocalStorage.get("checkout") || initialCheckoutValue);
        }else{
            tryLocalStorage.set("checkout", {...checkout, step: 1});
        }
    }, [checkout])

    function addToCart(prdName:string){
        setCheckout({...checkout, carrito: [...checkout.carrito, prdName]});
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
            removeFromCart
        }
    }, [scrolledBottom, store, checkout]);
    return <AppContext.Provider value={value} {...props} />
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
}