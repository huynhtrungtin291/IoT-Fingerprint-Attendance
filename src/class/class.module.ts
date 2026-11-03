import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from './class.service.js';
import { ClassController } from './class.controller.js';
import { ClassSchema } from './schema/class.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Class', schema: ClassSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}