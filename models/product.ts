import mongoose, { Schema, model } from 'mongoose';
import { ProductType } from 'types';

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true },
  price: { type: Number, required: true},
  sellingPrice: { type: Number },
  image: { type: String },
  description: { type: String },
  category: { type: String },
  stock: { type: Number },
});

const Product = mongoose.models.Product || model<ProductType>('Product', productSchema);

export default Product;