import { CreateMenuDto } from '@modules/menu/application/dtos/create-menu.dto';
import { ReorderMenuDto } from '@modules/menu/application/dtos/reorder-menu.dto';
import { UpdateMenuDto } from '@modules/menu/application/dtos/update-menu.dto';
import { Menu } from '@modules/menu/domain/entities/menu.entity';
import { MenuService } from '@modules/menu/domain/services/menu.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new menu' })
    @ApiResponse({ status: 201, description: 'Menu created successfully.', type: Menu })
    create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
        return this.menuService.create(createMenuDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all menus as a flat list' })
    @ApiResponse({ status: 200, description: 'Menu list retrieved successfully.', type: [Menu] })
    findAll(): Promise<Menu[]> {
        return this.menuService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a menu by ID' })
    @ApiResponse({ status: 200, description: 'Menu retrieved successfully.', type: Menu })
    @ApiResponse({ status: 404, description: 'Menu not found.' })
    findOne(@Param('id') id: string): Promise<Menu> {
        return this.menuService.findOne(id);
    }

    @Put('reorder')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reorder menus or move them to a different parent in batch' })
    @ApiResponse({ status: 200, description: 'Menu order updated successfully.' })
    @ApiResponse({ status: 400, description: 'Validation failed or the parent structure is invalid.' })
    reorder(@Body() reorderMenuDto: ReorderMenuDto): Promise<void> {
        return this.menuService.reorder(reorderMenuDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a menu by ID' })
    @ApiResponse({ status: 200, description: 'Menu updated successfully.', type: Menu })
    @ApiResponse({ status: 404, description: 'Menu not found.' })
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return this.menuService.update(id, updateMenuDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a menu by ID (including all child menus)' })
    @ApiResponse({ status: 204, description: 'Menu deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Menu not found.' })
    remove(@Param('id') id: string): Promise<void> {
        return this.menuService.remove(id);
    }
}