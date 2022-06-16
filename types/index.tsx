import { NextPage } from "next";
import { SwiperProps } from "swiper/react";

export type NextPageAugmented<P = {}, IP = P> = NextPage<P, IP> & {
    nav?: React.ReactNode,
    footer?: React.ReactNode
};
  
export type ProductType = {
    id:number, 
    name: string, 
    price: number, 
    sellingPrice:number, 
    image?: string, 
    description?:string
    stock?:number
    category?:string
}

export type CheckoutType = {
    step:number,
    completed: boolean,
    carrito: string[],
    cartGrossTotal: number,
    cartNetTotal: number,
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
    mpCredentials: "juan" | "fran" | null
}

export type OptionsType = {label:string, value:string}[]

export interface ApiResponse {
    status: "success" | "failure",
}
  
export type ConfigType = {
    preOrderDate: string | null,
    mpCredentials: "juan" | "fran",
}

export interface AugmentedSwiperProps extends SwiperProps {
    ref?: any
}