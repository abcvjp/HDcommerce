import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
	@IsNotEmpty()
	readonly name: string;

	@IsOptional()
	readonly isPublic: boolean;

	@IsNotEmpty()
	readonly description: boolean;

	@IsNotEmpty()
	readonly thumbnail: string;

	@IsNotEmpty()
	readonly metaTitle: string;

	@IsNotEmpty()
	readonly metaDescription: string;

	@IsOptional()
	readonly metaKeywords: string;

	@IsOptional()
	readonly parentId: string;
}