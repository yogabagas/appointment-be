import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('book')
  async bookSlot(
    @Body() bookSlotDto: { date: string; time: string; booked_by: string },
  ) {
    const { date, time, booked_by } = bookSlotDto;
    return this.appointmentsService.createAppointment(date, time, booked_by);
  }
}
