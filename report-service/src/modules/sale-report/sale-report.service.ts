import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SaleReport } from './schemas/sale-report.schema';
import { ISaleReport } from './interfaces/sale-report.interface';
import * as moment from 'moment';
import { FindSaleReportDto } from './dto/find-sale-report.dto';
import { merge } from 'lodash';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SORT,
} from 'src/common/constants';
import { FindAllResult } from 'src/common/classes/find-all.result';

@Injectable()
export class SaleReportService {
  constructor(
    @InjectModel(SaleReport.name)
    private readonly saleReportModel: Model<SaleReport>,
  ) {}

  async init(day: Date): Promise<SaleReport> {
    return await this.saleReportModel.create({ day });
  }

  async findOne(date: string): Promise<ISaleReport> {
    return await this.saleReportModel.findOne({ day: new Date(date) });
  }

  async findAll(dto: FindSaleReportDto): Promise<FindAllResult<ISaleReport>> {
    const { endDate, startDate, type, skip, limit, sort } = dto;
    const dbQuery = this.saleReportModel.aggregate();

    const filter: FilterQuery<SaleReport> = {};
    startDate && (filter.day = { $gte: startDate });
    endDate && (filter.day = merge(filter.day, { $lte: endDate }));
    dbQuery.match(filter);

    let groupId;
    type === 'month' && (groupId = { $month: '$day' });
    type === 'week' && (groupId = { $week: '$day' });
    type === 'year' && (groupId = { $year: '$day' });

    if (type !== 'day') {
      dbQuery.group({
        _id: groupId,
        orderNumber: { $sum: '$orderNumber' },
        completedOrder: { $sum: '$completedOrder' },
        failedOrder: { $sum: '$failedOrder' },
        productNumber: { $sum: '$productNumber' },
        itemNumber: { $sum: '$itemNumber' },
        orderTotal: { $sum: '$orderTotal' },
        deliveryFee: { $sum: '$deliveryFee' },
        revenue: { $sum: '$revenue' },
      });
    } else {
      dbQuery.append({
        $set: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$day' } },
        },
      });
    }

    const [dataQuery] = await dbQuery
      .facet({
        records: [
          { $skip: skip ? skip : 0 },
          { $limit: limit ? limit : DEFAULT_DBQUERY_LIMIT },
          {
            $sort: sort ? (sort as any) : groupId ? { _id: -1 } : { day: -1 },
          },
        ],
        count: [{ $count: 'count' }],
      })
      .exec();

    const { records } = dataQuery;
    const count = dataQuery.count[0] ? dataQuery.count[0].count : 0;

    return new FindAllResult(records, count);
  }

  // async create(dto: CreateSaleReportDto): Promise<ISaleReport> {
  // return await this.saleReportModel.create(dto);
  // }

  async handleOrderCreated(order: any): Promise<void> {
    const orderDay = moment(new Date(order.createdAt)).startOf('day').toDate();
    let saleReport: SaleReport = await this.saleReportModel.findOne({
      day: orderDay,
    });
    if (!saleReport) {
      saleReport = await this.init(orderDay);
    }
    await saleReport.update({
      $inc: {
        orderNumber: 1,
        productNumber: order.items.length,
        itemNumber: order.items.reduce((acc, val) => acc + val.quantity, 0),
        orderTotal: order.orderTotal,
        deliveryFee: order.deliveryFee,
      },
    });
  }

  async handleOrderSucceed(order: any): Promise<void> {
    const orderDay = moment(new Date(order.createdAt)).startOf('day').toDate();
    await this.saleReportModel.findOneAndUpdate(
      {
        day: orderDay,
      },
      {
        $inc: {
          completedOrder: 1,
          revenue: order.orderTotal,
          // profit: order.itemTotal - order.items.reduce((acc, val) => acc + val.quantity*val.price``)
        },
      },
    );
  }

  async handleOrderFailed(order: any): Promise<void> {
    const orderDay = moment(new Date(order.createdAt)).startOf('day').toDate();
    await this.saleReportModel.findOneAndUpdate(
      {
        day: orderDay,
      },
      {
        $inc: {
          failedOrder: 1,
        },
      },
    );
  }
}
