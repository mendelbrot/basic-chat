import { Model, DataTypes, Sequelize } from 'sequelize';
import db from '../lib/db';

class Message extends Model {
  declare id: number;
  declare message: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    underscored: true
  }
);

export default Message;