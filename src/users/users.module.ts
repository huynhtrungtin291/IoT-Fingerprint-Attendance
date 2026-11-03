import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema.js';
import { PasswordHasher } from '@nestjs/authentication';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasher],
  exports: [UsersService]
})
export class UsersModule {}
