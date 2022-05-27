import axios from "axios";
import { CheckoutType } from '../types/index'

const ENDPOINT:string = `${process.env.NEXT_PUBLIC_APP_URL}/api`;

export const registerCheckout = (data:CheckoutType) => axios.post(`${ENDPOINT}/register-checkout`, data);