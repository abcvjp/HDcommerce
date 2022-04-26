import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // Optional casting into ObjectId if wanted!
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
      throw new BadRequestException(`${metadata.data} must be a mongoId`);
    }
    throw new BadRequestException(`${metadata.data} must be a mongoId`);
  }
}
