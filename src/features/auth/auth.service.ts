import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LocalStrategyDto } from './dtos';
import { UsersService } from '../users/users.service';
import { SecurityHashingService } from '@/core/_provides';
import { UN_AUTHORIZED } from '@/constants/_consts';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityHashingService: SecurityHashingService,
  ) {}

  async login(user: any) {
    try {
      console.log('user', user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        return null;
      }

      const isCompared = await this.securityHashingService.compare(password, user.password);
      if (!isCompared) {
        throw new UnauthorizedException({
          message: 'Invalid credentials',
          errorMessageCode: UN_AUTHORIZED,
        });
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
