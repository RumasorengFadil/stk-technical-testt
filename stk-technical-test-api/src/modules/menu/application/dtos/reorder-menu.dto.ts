import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator';

export class ReorderMenuItemDto {
    @ApiProperty({
        description: 'Unique identifier of the menu to be reordered.',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID('4', { message: 'id must be a valid UUID.' })
    @IsNotEmpty({ message: 'Menu ID is required.' })
    id!: string;

    @ApiProperty({
        description:
            'New parent menu ID. Set to null to move the menu to the root level.',
        example: '550e8400-e29b-41d4-a716-446655440000',
        nullable: true,
    })
    @IsOptional()
    @IsUUID('4', { message: 'parentId must be a valid UUID.' })
    parentId!: string | null;

    @ApiProperty({
        description: 'New display order within the target parent.',
        example: 1,
    })
    @IsInt({ message: 'Order must be an integer.' })
    order!: number;
}

export class ReorderMenuDto {
    @ApiProperty({
        description:
            'Collection of menu items to reorder or move to another parent.',
        type: [ReorderMenuItemDto],
    })
    @IsArray({ message: 'Items must be an array.' })
    @ValidateNested({ each: true })
    @Type(() => ReorderMenuItemDto)
    items!: ReorderMenuItemDto[];
}