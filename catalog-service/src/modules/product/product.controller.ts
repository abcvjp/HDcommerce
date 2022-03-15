import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllProductDto } from './dto/find-all-product.dto';

@Controller('product')
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
  async getProducts() {
    return 'hoai dep trai vai lon';
  }
}
