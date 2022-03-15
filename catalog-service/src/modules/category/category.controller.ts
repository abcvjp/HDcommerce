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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindAllCategoryDto } from './dto/find-all-category.dto';
import { FindOneCategoryDto } from './dto/find-one-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: FindOneCategoryDto) {
    return this.categoryService.findOne(id, query);
  }

  @Get()
  findAll(@Query() query: FindAllCategoryDto) {
    return this.categoryService.findAll(query);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.categoryService.deleteOne(id);
  }
}
