import axios from "axios";
import { CheckoutType } from '../types/index'

const ENDPOINT:string = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

export const registerCheckout = (data:CheckoutType) => axios.post(`${ENDPOINT}/register-checkout`, data);
export const subscribe = (email:string) => axios.post(`${ENDPOINT}/subscribe`, {email});
export const getStore = () => axios.get(`${ENDPOINT}/store`);