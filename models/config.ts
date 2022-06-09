import mongoose, { Schema, model } from 'mongoose';
import { ConfigType } from 'types';

const configSchema = new Schema<ConfigType>({
  preOrderDate: {type: Date || null},
  mpCredentials: {type: String}
});

const Config = mongoose.models.Config || model<ConfigType>('Config', configSchema);

export default Config;