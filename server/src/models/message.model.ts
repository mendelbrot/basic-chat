import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db';

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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true
  }
);

// Create the table if it doesn't exist
Message.sync();

export default Message;