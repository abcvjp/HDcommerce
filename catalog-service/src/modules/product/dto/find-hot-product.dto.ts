import { FindAllDto } from 'src/common/dto/find-all.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class FindHotProductDto extends FindAllDto {
    @IsNotEmpty()
    @IsNumber()
    recent: number;
}
