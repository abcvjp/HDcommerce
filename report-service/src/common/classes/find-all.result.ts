export class FindAllResult<T> {
  records: T[];
  count?: number;
  constructor(data: T[], count?: number) {
    this.records = data;
    this.count = count;
  }
}
