import { Model, DataTypes, CreationOptional } from 'sequelize';
import db from '../lib/db';
import User from './users.model';

export const publicMessageFields = [
  "id",
  "text",
  "senderId",
  "createdAt",
  "updatedAt",
];

class Message extends Model {
  declare id: number;
  declare text: string;
  declare senderId: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    underscored: true
  }
);

Message.belongsTo(User, {
  foreignKey: 'senderId',
});


export default Message;