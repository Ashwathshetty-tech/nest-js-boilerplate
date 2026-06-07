import { Provider } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const MongodbProvider: Provider = {
  provide: 'MONGODB_CONNECTION',
  useFactory: async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
    const conn = await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'mydb' });
    return conn;
  },
};
