import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import uploadConfig from './config/upload.config';
import { validationSchema } from './config/validation';
import { MenuModule } from './modules/menu/menu.module';
import { FilesModule } from './shared/files/file.module';
import mailConfig from './shared/infrastructure/mail/mail.config';
import { MailModule } from './shared/infrastructure/mail/mail.module';
import { SearchPaginationModule } from './shared/search-pagination/search-pagination.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: 'mysql',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.name,
        autoLoadEntities: true, // otomatis load entity
        synchronize: true, //! Jangan true di production!
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, uploadConfig, mailConfig],
      envFilePath: '.env',
      validationSchema,
    }),
    FilesModule,
    SearchPaginationModule,
    MailModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
