import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './domain/entities/menu.entity';
import { MenuService } from './domain/services/menu.service';
import { MenuController } from './infrastructure/http/controllers/menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule { }