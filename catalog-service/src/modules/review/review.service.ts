import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { IReview } from './interfaces/review.interface';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async findByProductId(productId: string): Promise<IReview[]> {
    const reviews = await this.reviewModel
      .find({ productId }, { _id: 0, productId: 0 })
      .lean();
    reviews.forEach((review) => {
      review.userId = review.userId.toString();
    });
    return reviews;
  }

  async create(userId: string, dto: CreateReviewDto): Promise<IReview> {
    const { productId, comment, star } = dto;
    const review = await this.reviewModel.findOneAndUpdate(
      { userId, productId, star: null },
      { comment, star },
      { new: true },
    );
    if (!review)
      throw new ForbiddenException('You can not review this product');
    return review;
  }

  async initMultiple(userId: string, productIds: string[]): Promise<void> {
    const bulkInsert = [];
    for (const productId of productIds) {
      bulkInsert.push({ createOne: { userId, productId } });
    }
    await this.reviewModel.bulkWrite(bulkInsert);
  }

  async update(id: string, dto: UpdateReviewDto): Promise<IReview> {
    const review = await this.reviewModel
      .findByIdAndUpdate({ _id: id, ...dto }, { new: true })
      .lean();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async deleteOne(id: string): Promise<void> {
    const foundReview = await this.reviewModel.findById(id);
    if (!foundReview) {
      throw new NotFoundException('Review not found');
    }
    await foundReview.delete();
  }
}
