import { dataSourceOptions } from '@db/data-source';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './features/post/module/post.module';
import { AuthModule } from './features/auth/module/auth.module';
import { UserModule } from './features/user/module/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
    }),
    PostModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
