import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '@/utils/db-connect';
import Product from 'models/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // await mongooseConnect();
    const category = req.query.category as string;
    // const filter = { category };
    // const products = await Product.find(filter)

    const prds:any = {
        billeteras: [
            { params: { billetera: 'chocolate' } },
            { params: { billetera: 'suela' } },
            { params: { billetera: 'boom' } },
        ],
        relojes: [
            { params: { reloj: 'quemanta' } },
            { params: { reloj: 'tesh' } },
            { params: { reloj: 'jauke' } },
            { params: { reloj: 'mahai' } },
        ]
    }

    const products = prds[category];

    res.status(200).json({status: "success", products}); 
}