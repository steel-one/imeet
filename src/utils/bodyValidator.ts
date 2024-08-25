import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function BodyValidator(dtoClass) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      const dtoInstance = plainToInstance(dtoClass, args[0]);
      const errors = await validate(dtoInstance);

      if (errors.length) {
        const logger = new Logger(BodyValidator.name);
        logger.error(
          'Body validation failed: ' +
            errors.map((error) => Object.values(error.constraints)).join(', '),
        );
        throw new Error('Body validation failed.');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
