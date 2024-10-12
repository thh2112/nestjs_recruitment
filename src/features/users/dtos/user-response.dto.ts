import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Transform(({ obj }) => obj._id)
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  age: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
