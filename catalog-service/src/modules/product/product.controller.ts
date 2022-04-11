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
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Get()
  findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
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
}
