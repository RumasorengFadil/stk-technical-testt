import { Menu } from '@modules/menu/domain/entities/menu.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const dataSource = app.get(DataSource);

    const repo = dataSource.getRepository(Menu);

    await repo.save([
        {
            name: 'System Management',
            order: 1,
            isActive: true,
        },
    ]);

    await app.close();
}

bootstrap();