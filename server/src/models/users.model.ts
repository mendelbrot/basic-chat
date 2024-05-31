import { Model, DataTypes, CreationOptional } from "sequelize";
import db from "../lib/db";

export interface PublicUser {
  id: number;
  username: string;
  activeAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const publicUserFields = [
  "id",
  "username",
  "activeAt",
  "createdAt",
  "updatedAt",
];

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare activeAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    activeAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    underscored: true,
  }
);

export default User;
