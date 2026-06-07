import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    method: String,
    url: String,
    headers: Object,
    body: Object,
    responseBody: Object,
    statusCode: Number,
    responseTime: Number,
    timestamp: { type: Date, default: Date.now }
  }
);


export const Log = mongoose.model('Log', logSchema as any);

// create TTL index: 7 days
try {
  Log.collection.createIndex({ timestamp: 1 }, { expireAfterSeconds: 604800 }); // 7 days = 604800 seconds
} catch (err) {
  // index creation may fail at import time if collection doesn't exist yet
}
