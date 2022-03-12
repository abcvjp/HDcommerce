import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly title: string;

	@IsOptional()
	readonly isEnabled: boolean;

	@IsOptional()
	readonly isPublic: boolean;

	@IsNotEmpty()
	readonly price: number;

	@IsNotEmpty()
	readonly originalPrice: number;

	@IsNotEmpty()
	readonly stockQuantity: number;

	@IsNotEmpty()
	readonly soldQuantity: number;

	@IsNotEmpty()
	readonly description: boolean;

	@IsNotEmpty()
	readonly shortDescription: boolean;

	@IsNotEmpty()
	readonly thumbnail: string;

	@IsOptional()
	readonly images: string[];

	@IsNotEmpty()
	readonly metaTitle: string;

	@IsNotEmpty()
	readonly metaDescription: string;

	@IsOptional()
	readonly metaKeywords: string;
}