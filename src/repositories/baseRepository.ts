import {Model} from 'objection';
import knex from 'configs/knex';

export default class BaseRepository<T extends Model> {
  private type: typeof Model;

  constructor(type: typeof Model) {
    this.type = type;
  }

  create = async (object: Object) => {
    return (await this.type.query().insert(object)) as T;
  };

  findOneByCondition = async (condition: Object) => {
    const model = (await this.type.query().findOne(condition)) as T;
    return model;
  };

  getAll = async (offset: number, limit: number) => {
    return await this.type.query().select().offset(offset).limit(limit);
  };

  getCount = async () => {
    const countModel = await this.type.query().count().first();
    return (countModel as any).count;
  };

  update = async (model: T) => {
    return await model.$query().patch();
  };

  deleteWhere = async (name: string, param: any) => {
    return await this.type.query().delete().where(name, param);
  };
}
