import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async encodePassword(password: string): Promise<string> {
    const rounds: number = 12;
    return await bcrypt.hash(password, rounds);
  }
  async comparePasswords(
    enteredPassword: string,
    databasePassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, databasePassword);
  }
}
