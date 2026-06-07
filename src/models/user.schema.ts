import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});
