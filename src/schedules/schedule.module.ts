import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './schedule.entity';
import { Appointment } from '../appointments/appointment.entity';
import { AppointmentsService } from '../appointments/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Schedule])],
  providers: [AppointmentsService, ScheduleService],
  controllers: [ScheduleController],
})
export class SchedulesModule {}
