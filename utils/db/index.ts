import mongooseConnect from '@/utils/db/connect';
import Product from 'models/product';
import { ProductType } from 'types';

export const getProductPaths = async (category:string, prdKey:string) => {
    await mongooseConnect();
    const products = await Product.find({category})
    const paths = products.map((product:ProductType)=>({params: {[prdKey]: product.name.toLocaleLowerCase()}}))
    return paths;
}

export const getProduct = async (name:string):Promise<ProductType> => {
    await mongooseConnect();
    const product = await Product.findOne({name}, '-_id').lean()
    return product;
}