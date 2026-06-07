import { Schema } from 'mongoose';

export const ActorSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
});
