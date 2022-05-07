import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NumberFilter } from '../dto/number-filter.dto';

export function IsNumberFilter() {
  return applyDecorators(
    Transform(({ value }) => {
      const transformedValue =
        typeof value !== 'object'
          ? new NumberFilter(parseInt(value, 10))
          : value;
      return transformedValue;
    }) as PropertyDecorator,
    Type(() => NumberFilter) as PropertyDecorator,
    ValidateNested() as PropertyDecorator,
  );
}
