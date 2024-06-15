import { signToken } from "../../src/lib/auth";
import User from "../../src/models/users.model";

class UserTokenClass {
  user: User;
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  static async createInstance(username: string) {
    let user = await User.findOne({ where: { username: username } });

    if (!user) {
      throw new Error(`User ${username} not found.`);
    }
    
    const token = signToken(user)
    return new UserTokenClass(user, token)
  }
}

export default UserTokenClass;
