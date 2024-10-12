import { IsStrongPassword } from '@/core/_decorators/is-strong-password';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BaseCredentialDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ allow_utf8_local_part: false }, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword({ minLength: 6, minUppercase: 1, minSymbols: 1 })
  password: string;
}
