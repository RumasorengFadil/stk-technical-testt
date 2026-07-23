import { CreateMenuDto } from '@modules/menu/application/dtos/create-menu.dto';
import { ReorderMenuDto } from '@modules/menu/application/dtos/reorder-menu.dto';
import { UpdateMenuDto } from '@modules/menu/application/dtos/update-menu.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
        private readonly dataSource: DataSource, // Inject DataSource for transaction support
    ) { }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        // Validate that the provided parent menu exists
        if (createMenuDto.parentId) {
            const parentExists = await this.menuRepository.findOne({
                where: { id: createMenuDto.parentId },
            });

            if (!parentExists) {
                throw new BadRequestException('Parent menu with the specified ID was not found.');
            }
        }

        const newMenu = this.menuRepository.create(createMenuDto);
        return await this.menuRepository.save(newMenu);
    }

    async findAll(): Promise<Menu[]> {
        // Return all menus as a flat list.
        // Sort by parentId and order to keep the data organized for the frontend.
        return await this.menuRepository.find({
            order: {
                parentId: 'ASC',
                order: 'ASC',
            },
        });
    }

    async findOne(id: string): Promise<Menu> {
        const menu = await this.menuRepository.findOne({ where: { id } });

        if (!menu) {
            throw new NotFoundException(`Menu with ID '${id}' was not found.`);
        }

        return menu;
    }

    async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        const menu = await this.findOne(id); // Ensure the menu exists

        // If parentId is being updated, validate that the new parent exists
        // and prevent a menu from becoming its own parent.
        if (updateMenuDto.parentId) {
            if (updateMenuDto.parentId === id) {
                throw new BadRequestException('A menu cannot be its own parent.');
            }

            const parentExists = await this.menuRepository.findOne({
                where: { id: updateMenuDto.parentId },
            });

            if (!parentExists) {
                throw new BadRequestException('Parent menu with the specified ID was not found.');
            }
        }

        // Merge the existing menu with the updated data and save it
        Object.assign(menu, updateMenuDto);
        return await this.menuRepository.save(menu);
    }

    async remove(id: string): Promise<void> {
        const menu = await this.findOne(id); // Ensure the menu exists

        // Since the entity is configured with { onDelete: 'CASCADE' },
        // deleting a parent menu will automatically remove all of its child menus.
        await this.menuRepository.remove(menu);
    }

    async reorder(reorderMenuDto: ReorderMenuDto): Promise<void> {
        // Use a transaction to ensure the batch operation is executed atomically
        await this.dataSource.transaction(async (manager) => {
            for (const item of reorderMenuDto.items) {
                // Find the menu by its ID
                const menu = await manager.findOne(Menu, {
                    where: { id: item.id },
                });

                if (!menu) {
                    throw new NotFoundException(`Menu with ID '${item.id}' was not found.`);
                }

                // If the parent is changed, validate the new parent
                if (item.parentId !== undefined && item.parentId !== menu.parentId) {
                    if (item.parentId !== null) {
                        if (item.parentId === item.id) {
                            throw new BadRequestException('A menu cannot be its own parent.');
                        }

                        const parentExists = await manager.findOne(Menu, {
                            where: { id: item.parentId },
                        });

                        if (!parentExists) {
                            throw new BadRequestException(
                                `Parent menu with ID '${item.parentId}' was not found.`,
                            );
                        }
                    }

                    menu.parentId = item.parentId;
                }

                // Update the display order
                menu.order = item.order;

                // Save the changes using the transaction manager
                await manager.save(menu);
            }
        });
    }
}