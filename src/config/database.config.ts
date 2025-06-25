import { registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModule => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: Boolean(process.env.DB_SYNC ?? false),
    // synchronize: true,

    // autoLoadEntities: true,
    // synchronize: true,
  }),
);
