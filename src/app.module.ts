import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { RolesGuard } from './common/guards/roles.guard.js';
import { ClassModule } from './class/class.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { SectionsModule } from './sections/sections.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { RoomsModule } from './rooms/rooms.module.js';
import { DevicesModule } from './devices/devices.module.js';
import { FingerprintsModule } from './fingerprints/fingerprints.module.js';
import { FingerprintRegistrationsModule } from './fingerprint_registrations/fingerprint_registrations.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ClassModule,
    CoursesModule,
    SectionsModule,
    SessionsModule,
    EnrollmentsModule,
    AttendanceModule,
    RoomsModule,
    DevicesModule,
    FingerprintsModule,
    FingerprintRegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
