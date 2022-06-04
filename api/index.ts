import axios from "axios";
import { CheckoutType } from '../types/index'

const ENDPOINT:string = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}

export const registerCheckout = (data:CheckoutType) => axios.post(`${ENDPOINT}/register-checkout`, data);

// export const getProducts = (category:string) => axios.get(`${ENDPOINT}/products/${category}`); 
export const getProducts = (category:string) => fetch(`${ENDPOINT}/products/${category}`, {headers, method: 'GET'})

export const getProduct = (category:string, name:string) => axios.get(`${ENDPOINT}/products/${category}/${name}`); 

export const subscribe = (email:string) => axios.post(`${ENDPOINT}/subscribe`, {email});