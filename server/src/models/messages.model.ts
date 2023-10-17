import { Model, DataTypes, Sequelize } from 'sequelize';
import db from '../lib/db';
import User from './users.model';

export const publicMessageFields = [
  "id",
  "content",
  "userId",
  "createdAt",
  "updatedAt",
];

class Message extends Model {
  declare id: number;
  declare message: string;
  declare userId: string;
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

Message.belongsTo(User, {
  foreignKey: 'userId',
});


export default Message;