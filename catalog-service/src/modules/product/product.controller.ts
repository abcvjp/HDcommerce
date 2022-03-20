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
import { MessagePattern } from '@nestjs/microservices';
import { FindAllProductDto } from './dto/find-all-product.dto';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { IProduct } from './interfaces/product.interface';

@Controller('product')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get()
  findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }

  @MessagePattern('get_products')
  async getProducts(data): Promise<IProduct> {
    return await this.productService.findOne('6231ae7f8f0ca8cbca9771be');
  }
}
