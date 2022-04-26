import { IsNotEmpty, IsString } from 'class-validator';

export class PayWithStripeDto {
  @IsNotEmpty()
  @IsString()
  tokenId: string;
}
