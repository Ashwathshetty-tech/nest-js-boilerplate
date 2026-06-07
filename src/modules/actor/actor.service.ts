import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ActorService {
  private model: any;

  constructor(@Inject('MONGODB_CONNECTION') private conn: any) {
    // register or reuse model
    const { ActorSchema } = require('../../models/actor.schema');
    this.model = this.conn.models.Actor || this.conn.model('Actor', ActorSchema);
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
