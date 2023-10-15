import { Model, DataTypes, Sequelize } from 'sequelize';
import db from '../lib/db';

class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
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
  },
  {
    sequelize: db,
    underscored: true
  }
);

export default User;