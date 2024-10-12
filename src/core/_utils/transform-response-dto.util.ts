import { instanceToPlain, plainToInstance } from 'class-transformer';

export function transformDtoToPlainObject<T, V>(instance: new () => T, plainObject: V) {
  const dtoInstance = plainToInstance(instance, plainObject, { excludeExtraneousValues: true });

  return instanceToPlain(dtoInstance);
}
