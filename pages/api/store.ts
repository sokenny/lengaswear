import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '@/utils/db/connect';
import Product from 'models/product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect();
    const store = await Product.find().lean();
    res.status(200).json({status: "success", store}); 
}

export {}