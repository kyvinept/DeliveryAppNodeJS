import {Model} from 'objection';
import knex from 'configs/knex';

export interface JoinModel {
  joinParams: {
    table: string;
    joinedColumn: string;
    column: string;
  };
  selectParams?: string[];
  whereParams?: Object;
}

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

  getAll = async (offset: number, limit: number, whereModel: Object = null) => {
    const condition = this.type.query().select();
    if (whereModel) {
      condition.where(whereModel);
    }

    condition.offset(offset).limit(limit);
    return await condition;
  };

  getCount = async (whereModel: Object = null) => {
    const countModel = this.type.query().count();
    if (whereModel) {
      countModel.where(whereModel);
    }

    countModel.first();
    return ((await countModel) as any).count;
  };

  update = async (model: T) => {
    return await model.$query().patch();
  };

  deleteWhere = async (name: string, param: any) => {
    return await this.type.query().delete().where(name, param);
  };

  delete = async (model: T) => {
    return await model.$query().delete();
  };

  getAllWithPagination = async (
    page: number,
    perPage: number,
    whereCondition: Object = null,
  ) => {
    const data = await this.getAll(
      (page - 1) * perPage,
      perPage,
      whereCondition,
    );
    const totalCount = await this.getCount(whereCondition);
    return {data, totalCount: parseInt(totalCount)};
  };

  join = async (model: JoinModel) => {
    let joinModels = this.type
      .query()
      .join(
        model.joinParams.table,
        model.joinParams.joinedColumn,
        model.joinParams.column,
      );

    if (model.selectParams) {
      joinModels = joinModels.select(...model.selectParams);
    }

    if (model.whereParams) {
      joinModels = joinModels.where(model.whereParams);
    }

    return await joinModels;
  };
}
