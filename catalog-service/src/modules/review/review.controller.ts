import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/constants';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@UserId() userId: string, @Body() dto: CreateReviewDto) {
    return this.reviewService.create(userId, dto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id', MongoIdPipe) id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.reviewService.deleteOne(id);
  }
}
