import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityHashingService {
  public static SALT_ROUNDS = 10;
  private logger = new Logger(SecurityHashingService.name);

  public async hash(
    plainPassword: string,
    saltRound = SecurityHashingService.SALT_ROUNDS,
  ): Promise<string> {
    return await bcrypt
      .hash(plainPassword, saltRound)
      .then(hash => {
        this.logger.verbose('Password hashed', {
          context: SecurityHashingService.name,
          plainPassword,
          hashPassword: hash,
        });

        return hash;
      })
      .catch(err => {
        this.logger.warn(err.message);
        throw err;
      });
  }

  public async compare(plainPassword: string, hashPassword: string): Promise<boolean> {
    return await bcrypt
      .compare(plainPassword, hashPassword)
      .then(result => {
        this.logger.warn('Password compared', {
          context: SecurityHashingService.name,
          plainPassword,
          hashPassword,
          result,
        });

        return result === true;
      })
      .catch(err => {
        this.logger.warn(err.message);
        throw err;
      });
  }
}
