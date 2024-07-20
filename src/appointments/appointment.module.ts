import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { Schedule } from '../schedules/schedule.entity';
import { ScheduleService } from '../schedules/schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Schedule])],
  providers: [AppointmentsService, ScheduleService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
