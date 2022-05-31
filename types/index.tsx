import { NextPage } from "next";

export type NextPageAugmented<P = {}, IP = P> = NextPage<P, IP> & {
    nav?: React.ReactNode,
    footer?: React.ReactNode
};
  
export type ProductType = {
    id:number, 
    name: string, 
    price: number, 
    sellingPrice:number, 
    href: string, 
    image?: string, 
    description?:string
    stock?:number
    category?:string
}

export type CheckoutType = {
    step:number,
    completed: boolean,
    carrito: string[],
    cartTotal: number,
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

export type OptionsType = {label:string, value:string}[]