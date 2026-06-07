import mongoose from 'mongoose';
import { logger } from './logger';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    logger.info('MongoDB Connected');
  } catch (error: any) {
    logger.error('MongoDB Connection Failed', error);
    process.exit(1);
  }
};
