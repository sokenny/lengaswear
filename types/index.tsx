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
