import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../types/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    const {email} = req.body
    const response = await fetch(`${process.env.SERVER_ENDPOINT}/suscribir`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
    const data = await response.json()
    if(data.status === "success"){
        res.status(200).json({ status: 'success' })
    }else{
        res.status(400).json({ status: 'failure'})
    }
}
