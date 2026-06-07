import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private model: any;

  constructor(@Inject('MONGODB_CONNECTION') private conn: any) {
    const { UserSchema } = require('../../models/user.schema');
    this.model = this.conn.models.User || this.conn.model('User', UserSchema);
  }

  async findAll() {
    return this.model.find().lean();
  }

  async findOne(id: string) {
    return this.model.findById(id).lean();
  }

  async create(payload: any) {
    const doc = new this.model(payload);
    return doc.save();
  }
}
