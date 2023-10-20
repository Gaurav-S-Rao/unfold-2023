import { DateTime } from 'luxon';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsISO8601(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsISO8601',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return DateTime.fromISO(value).isValid;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Date must be a valid ISO 8601 string';
        },
      },
    });
  };
}