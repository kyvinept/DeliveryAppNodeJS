import { User } from "models/database";
import { injectable } from "tsyringe";
import Repository from "./repository";

@injectable()
export default class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }
}
