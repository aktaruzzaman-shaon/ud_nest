// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TasksModule } from '../tasks/tasks.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { appConfig } from '../config/app.config';
// import { appConfigSchema } from '../config/config.types';
// import { typeOrmConfig } from '../config/database.config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypedConfigService } from '../config/typed-config.service';
// import { Task } from '../task.entity';
// import { UsersModule } from 'src/users/users.module';
// import { Type } from 'class-transformer';

// @Module({
//   // imports ------------------------
//   imports: [
//     // TypeOrmModule.forRootAsync({
//     //   imports: [ConfigModule],
//     //   inject: [ConfigService],
//     //   useFactory: (configService: TypedConfigService) => ({
//     //     ...configService.get('database'),
//     //     entities: [Task],
//     //     // return configService.get('typeOrmConfig');
//     //   }),
//     // }),
//     // ConfigModule.forRoot({
//     //   load: [appConfig, typeOrmConfig],
//     //   validationSchema: appConfigSchema,
//     //   validationOptions: {
//     //     // allowUnknown: false,
//     //     abortEarly: true,
//     //   },
//     // }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       entities: [],
//       synchronize: true,
//       port: 5432,
//       host: 'localhost',
//       username: 'postgres',
//       password: '123456',
//       database: 'udnest',
//     }),
//     TasksModule,
//     UsersModule, // Importing UsersModule
//   ],

//   // controllers ------------------------
//   controllers: [AppController],

//   // provides-------------------------
//   providers: [
//     AppService,
//     {
//       provide: TypedConfigService,
//       useExisting: ConfigService,
//     },
//   ],
// })
// export class AppModule {}

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: true,
      port: 5432,
      username: 'udnest',
      password: '123456',
      host: 'localhost',
      database: 'udnest',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
