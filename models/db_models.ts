import sequelize from "../db";

import { Table, Column, Model, Default, DataType } from "sequelize-typescript";

@Table
class User extends Model {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Default("USER")
  @Column(DataType.STRING)
  role: string;
}

sequelize.addModels([User]);

export { User };
