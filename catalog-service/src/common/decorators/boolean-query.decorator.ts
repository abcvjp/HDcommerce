import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function BooleanQuery() {
  return Transform(({ key, obj }) => {
    const value = obj[key];
    if (value === 'true' || value === true || value === 1 || value === '1')
      return true;
    if (value === 'false' || value === false || value === 0 || value === '0')
      return false;
    throw new BadRequestException(`${key} must be a boolean`);
  });
}
