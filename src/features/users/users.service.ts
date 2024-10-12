import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/features/users/schemas/user.schema';
import { Model } from 'mongoose';
import { SecurityHashingService } from '@/core/_provides';
import { UserResponseDto } from './dtos/user-response.dto';
import { transformDtoToPlainObject } from '@/core/_utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private securityHashingService: SecurityHashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, age, address, createdAt, updatedAt } = createUserDto;
      const existedUser = await this.findOneByEmail(email);
      if (existedUser) {
        throw new UnprocessableEntityException({
          message: 'User already exists',
        });
      }

      const hashedPassword = await this.securityHashingService.hash(password);
      const createdUser = await this.userModel.create({
        email,
        password: hashedPassword,
        age,
        address,
        createdAt,
        updatedAt,
      });

      return transformDtoToPlainObject(UserResponseDto, createdUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
