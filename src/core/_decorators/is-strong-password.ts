import {
  DEFAULT_MESSAGE,
  minLengthAndMaxLengthMessage,
  minLengthMessage,
  minSymbolsMessage,
  minUppercaseMessage,
} from '@/constants/_consts';
import {
  IsStrongPasswordOptions,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isStrongPassword,
  registerDecorator,
} from 'class-validator';

interface IsStrongPasswordCustomOptions extends IsStrongPasswordOptions {
  maxLength: number;
}

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const options: IsStrongPasswordOptions = validationArguments.constraints[0] || {};
    return isStrongPassword(value, options);
  }
  defaultMessage(args: ValidationArguments) {
    const { minLength, maxLength, minUppercase, minSymbols } = args.constraints[0] || {};
    const value = args.value || '';
    const fieldNameText = 'Password';
    if (value.length < minLength && !maxLength) {
      return minLengthMessage(maxLength, fieldNameText);
    }

    if (!minLength && value.length > maxLength) {
      return minLengthMessage(minLength, fieldNameText);
    }

    if (minLength && maxLength && (value.length < minLength || value.length > maxLength)) {
      return minLengthAndMaxLengthMessage(minLength, maxLength, fieldNameText);
    }

    if (minUppercase) {
      return minUppercaseMessage(minUppercase, fieldNameText);
    }

    if (minSymbols) {
      return minSymbolsMessage(minSymbols, fieldNameText);
    }

    return DEFAULT_MESSAGE;
  }
}

export function IsStrongPassword(
  constraints: Partial<IsStrongPasswordCustomOptions>,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: ValidatorConstraint,
    });
}
