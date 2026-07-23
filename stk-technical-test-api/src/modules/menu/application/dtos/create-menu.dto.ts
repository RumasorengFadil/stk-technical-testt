import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMenuDto {
  @ApiPropertyOptional({
    description:
      'Parent menu ID. Leave empty or null if this is a root-level menu.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'parentId must be a valid UUID.' })
  parentId?: string | null;

  @ApiProperty({
    description: 'Display name of the menu.',
    example: 'System Management',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Menu name is required.' })
  name!: string;

  @ApiPropertyOptional({
    description:
      'Frontend route path. Leave null if this menu is used as a folder or group.',
    example: '/system/menu',
  })
  @IsOptional()
  @IsString({ message: 'Path must be a string.' })
  path?: string | null;

  @ApiPropertyOptional({
    description:
      'Icon name (e.g. from lucide-react). Leave null if no icon is assigned.',
    example: 'folder',
  })
  @IsOptional()
  @IsString({ message: 'Icon must be a string.' })
  icon?: string | null;

  @ApiProperty({
    description: 'Display order within the same parent menu.',
    example: 1,
    default: 0,
  })
  @IsInt({ message: 'Order must be an integer.' })
  order!: number;

  @ApiProperty({
    description:
      'Indicates whether the menu is active. Inactive menus will be hidden.',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'isActive must be a boolean value.' })
  isActive!: boolean;
}