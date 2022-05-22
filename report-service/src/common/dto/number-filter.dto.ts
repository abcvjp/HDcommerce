import { IsNumber, IsOptional } from 'class-validator';
import { mapKeys } from 'lodash';

export class NumberFilter {
  @IsOptional()
  @IsNumber()
  readonly gte: number;

  @IsOptional()
  @IsNumber()
  readonly lte: number;

  @IsOptional()
  @IsNumber()
  readonly gt: number;

  @IsOptional()
  @IsNumber()
  readonly lt: number;

  @IsOptional()
  @IsNumber()
  readonly eq: number;

  @IsOptional()
  @IsNumber()
  readonly ne: number;

  constructor(eq?: number) {
    if (eq) {
      this.eq = eq;
    }
  }

  toMongooseFormat(): object {
    return mapKeys(this, (value, key) => '$' + key);
  }
}
