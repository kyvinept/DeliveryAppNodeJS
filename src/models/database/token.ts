import {Model} from 'objection';

export interface IToken {
  refresh_token: string;
  userId: number;
}

export class Token extends Model implements IToken {
  refresh_token: string;
  userId: number;

  static get tableName() {
    return 'Tokens';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['refresh_token', 'userId'],

      properties: {
        id: {type: 'integer'},
        refresh_token: {type: 'string'},
        userId: {type: 'integer'},
      },
    };
  }

  static get relationMappings() {
    const {User} = require('./user');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'Tokens.userId',
          to: 'Users.id',
        },
      },
    };
  }
}
