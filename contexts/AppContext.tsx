import React, { useEffect, useState } from 'react';
import { tryLocalStorage, useScrolledBottom } from "@/utils/index";
import { useMemo } from "react";
import { ProductType } from 'types';

type checkoutType = {
    step:number,
    carrito: string[],
    nombre: string,
    apellido: string,
    mail: string,
    telefono: string,
    fuente: string,
    pais: string,
    provincia: string,
    localidad: string,
    calle: string,
    numero: string,
    dpto: string,
}

interface AppContextInterface {
    scrolledBottom: boolean;
    store: ProductType[];
    checkout: checkoutType;
    setCheckout: (checkout:any)=> void;
    addToCart: (prdName: string) => void;
    removeFromCart: (prdName: string, all?:boolean) => void;
}

const initialCheckoutValue:checkoutType = {
    step: 1,
    carrito: [],
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
    const scrolledBottom:boolean = useScrolledBottom();

    // Hardcodeando temporalmente el store
    const store:ProductType[] = [
        {id: 1, name: "Quemanta", price: 10670, sellingPrice: 10670, stock: 10, href: "/relojes/quemanta", image: "", category: "relojes"},
        {id: 2, name: "Tesh", price: 10670, sellingPrice: 10670, stock: 10, href: "/relojes/tesh", image: "", category: "relojes"},
        {id: 3, name: "Jauke", price: 10670, sellingPrice: 10670, stock: 10, href: "/relojes/jauke", image: "", category: "relojes"},
        {id: 4, name: "Mahai", price: 10670, sellingPrice: 10670, stock: 10, href: "/relojes/mahai", image: "", category: "relojes"},
        {id: 5, name: "Chocolate", price: 3950, sellingPrice: 3950, stock: 10, href: "/relojes/chocolate", image: "", category: "billeteras"},
        {id: 5, name: "Suela", price: 3950, sellingPrice: 3950, stock: 10, href: "/relojes/suela", image: "", category: "billeteras"},
        {id: 5, name: "Boom", price: 3950, sellingPrice: 3950, stock: 10, href: "/relojes/boom", image: "", category: "billeteras"},
    ]

    const [checkout, setCheckout] = useState<checkoutType>(initialCheckoutValue)

    useEffect(()=>{
        tryLocalStorage.set("checkout", {...checkout, step: 1});
        console.log('checkout: ', checkout);
    }, [checkout])

    useEffect(()=>{
        setCheckout(tryLocalStorage.get("checkout") || initialCheckoutValue);
    }, [])

    function addToCart(prdName:string){
        if(checkout !== null){
            setCheckout({...checkout, carrito: [...checkout.carrito, prdName]});
        }
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