// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CheckoutType } from '../../types/index'

type CheckoutResponse = {
  status: "success" | "failure",
  paymentLink?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckoutResponse>) {
    const checkoutData:CheckoutType = req.body
    const response = await fetch(`${process.env.SERVER_ENDPOINT}/registrar-pedido`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(checkoutData)
    })
    const data = await response.json()
    if(data.status === "success"){
        res.status(200).json({ status: 'success', paymentLink: data.payment_link })
    }else{
        res.status(400).json({ status: 'failure'})
    }
}
