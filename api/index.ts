import axios from "axios";
import { CheckoutType } from '../types/index'

const ENDPOINT:string = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

export const registerCheckout = (data:CheckoutType) => axios.post(`${ENDPOINT}/register-checkout`, data);
export const subscribeToNewsletter = (email:string) => axios.post(`${ENDPOINT}/newsletter`, {email});
export const getStore = () => axios.get(`${ENDPOINT}/store`);
export const joinWaitingList = (data:{email:string, product:string}) => axios.post(`${ENDPOINT}/waiting-list`, data);