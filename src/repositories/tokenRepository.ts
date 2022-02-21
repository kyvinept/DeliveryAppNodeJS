import { Token } from "models/database";
import { injectable } from "tsyringe";
import Repository from "./repository";

@injectable()
export default class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token);
  }
}
