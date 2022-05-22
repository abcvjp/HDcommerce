import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SortQueryParamPipe implements PipeTransform {
  toSortObject = (sortString: string): Record<string, 1 | -1> => {
    const object = {};
    sortString.split(',').forEach((sortElement) => {
      if (sortElement.startsWith('-')) {
        object[sortElement.substring(1)] = -1;
      } else {
        object[sortElement] = 1;
      }
    });
    return object;
  };

  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (type === 'query') return this.transformQuery(value);

    return value;
  }

  transformQuery(query: any) {
    if (typeof query !== 'object' || !query) return query;

    const { sort } = query;

    if (sort && typeof sort === 'string') query.sort = this.toSortObject(sort);

    return query;
  }
}
