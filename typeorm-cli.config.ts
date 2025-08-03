import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3005,
  username: 'postgres',
  password: 'postgres',
  database: 'udnest',
  migrations: ['src/migrations/*.ts'], // Use TypeScript files directly
  entities: [
    'dist/**/*.entity.js', // Entities still use compiled JS files
    'dist/*.entity.js',
  ],
  synchronize: false,
});
