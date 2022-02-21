import { Model } from "objection";

export default class Repository<T extends Model> {
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

  update = async (model: T) => {
    return await model.$query().patch();
  };

  deleteWhere = async (name: string, param: any) => {
    return await this.type.query().delete().where(name, param);
  };
}
