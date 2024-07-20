import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('book')
  async bookSlot(
    @Body() bookSlotDto: { date: string; time: string; bookedBy: string },
  ) {
    const { date, time, bookedBy } = bookSlotDto;
    return this.appointmentsService.createAppointment(date, time, bookedBy);
  }
}
