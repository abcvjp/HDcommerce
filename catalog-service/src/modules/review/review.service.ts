import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(userId: string, dto: CreateReviewDto): Promise<IReview> {
    const createdReview = await this.reviewModel.create({ userId, ...dto });
    return createdReview;
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
