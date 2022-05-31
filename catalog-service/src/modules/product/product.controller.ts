import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { MongoIdPipe } from 'src/common/pipes/mongo-id.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/constants';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetRelatedProductsDto } from './dto/ get-related-product.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { ReviewProductDto } from './dto/review-product.dto';
import { DeleteMultiProductDto } from './dto/delete-multi-product.dto';
import { FindHotProductDto } from './dto/find-hot-product.dto';

@Controller('product')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('hot')
  findHotProduct(@Query() query: FindHotProductDto) {
    return this.productService.findHotProduct(query);
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Get(':id/relate')
  getRelated(
    @Param('id', MongoIdPipe) id: string,
    @Query() dto: GetRelatedProductsDto,
  ) {
    return this.productService.getRelated(id, dto);
  }

  @Get(':id/review')
  getReviews(@Param('id', MongoIdPipe) id: string) {
    return this.productService.getReviews(id);
  }

  @Get()
  findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
  }

  @Post(':id/review')
  review(
    @Param('id', MongoIdPipe) id: string,
    @UserId() userId: string,
    @Body() dto: ReviewProductDto,
  ) {
    return this.productService.createReview(userId, id, dto);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  deleteOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.deleteOne(id);
  }

  @Delete('')
  @Roles(UserRole.ADMIN)
  deleteMany(@Query() dto: DeleteMultiProductDto) {
    return this.productService.deleteMany(dto);
  }
}
