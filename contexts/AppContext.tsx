import React, { useEffect, useState } from 'react';
import { tryLocalStorage, useScrolledBottom } from "@/utils/index";
import { useMemo } from "react";
import { ProductType } from 'types';

type checkoutType = {
    carrito: string[];
} | null

interface AppContextInterface {
    scrolledBottom: boolean;
    store: ProductType[];
    checkout: checkoutType;
    addToCart: (prdName: string) => void;
    removeFromCart: (prdName: string) => void;
}

const initialCheckoutValue:checkoutType = {
    carrito: []
} 

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props:any){
    const scrolledBottom:boolean = useScrolledBottom();

    // Hardcodeando temporalmente el store
    const store:ProductType[] = [
        {id: 1, name: "Quemanta", price: 10670, sellingPrice: 10670, stock: 10, href: "", image: "", category: "relojes"},
        {id: 2, name: "Tesh", price: 10670, sellingPrice: 10670, stock: 10, href: "", image: "", category: "relojes"},
        {id: 3, name: "Jauke", price: 10670, sellingPrice: 10670, stock: 10, href: "", image: "", category: "relojes"},
        {id: 4, name: "Mahai", price: 10670, sellingPrice: 10670, stock: 10, href: "", image: "", category: "relojes"},
        {id: 5, name: "Chocolate", price: 3950, sellingPrice: 3950, stock: 10, href: "", image: "", category: "billeteras"},
        {id: 5, name: "Suela", price: 3950, sellingPrice: 3950, stock: 10, href: "", image: "", category: "billeteras"},
        {id: 5, name: "Boom", price: 3950, sellingPrice: 3950, stock: 10, href: "", image: "", category: "billeteras"},
    ]

    const [checkout, setCheckout] = useState<checkoutType>(null)

    useEffect(()=>{
        if(checkout !== null){
            tryLocalStorage.set("checkout", checkout);
        }
    }, [checkout])

    useEffect(()=>{
        setCheckout(tryLocalStorage.get("checkout") || initialCheckoutValue);
    }, [])

    function addToCart(prdName:string){
        if(checkout !== null){
            setCheckout({...checkout, carrito: [...checkout.carrito, prdName]});
        }
    }

    function removeFromCart(prdName: string){
        if(checkout !== null){
            const index = checkout.carrito.indexOf(prdName);
            if (index !== -1) {
                checkout.carrito.splice(index, 1)
                setCheckout({...checkout, carrito: [...checkout.carrito]});
            }
        }
    }

    useEffect(()=>{
        console.log('checkout: ', checkout)
    })

    const value = useMemo(()=>{
        return {
            store,
            scrolledBottom,
            checkout,
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