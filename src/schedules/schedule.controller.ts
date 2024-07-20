import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule.entity';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('available')
  async getAvailableSlots(@Query('date') date: string) {
    return this.scheduleService.getAvailableSchedule(date);
  }

  @Post('create')
  async createSchedule(@Body() createSchedule: Schedule) {
    return this.scheduleService.createSchedule(createSchedule);
  }
}
