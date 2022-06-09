import type { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from '@/utils/db/connect';
import Product from 'models/product';
import Config from 'models/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await mongooseConnect();
    const [productsRes, configRes]:[any, any] = await Promise.allSettled([Product.find().select('-_id').lean(), Config.findOne().select('-_id').lean()])
    if(productsRes.status === "fulfilled" && configRes.status === "fulfilled"){
        const store = {products: productsRes.value, config: configRes.value}
        res.status(200).json({status: "success", store}); 
    }else{
        res.status(400).json({status: "failure"}); 
    }
}

export {}