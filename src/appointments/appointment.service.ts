import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedules/schedule.entity';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(
    date: string,
    time: string,
    bookedBy: string,
  ): Promise<any> {
    const schedule = await this.scheduleRepository.findOne({ where: { date } });

    if (!schedule) {
      throw new Error('Slot not available for the selected date');
    }

    const existingBooking = await this.appointmentRepository.findOne({
      where: {
        booked_date: date,
        booked_time: time,
        schedule: { id: schedule.id },
      },
    });

    if (existingBooking) {
      throw new Error('Slot already booked');
    }

    const booking = this.appointmentRepository.create({
      schedule: schedule,
      booked_time: time,
      booked_date: date,
      booked_by: bookedBy,
    });

    await this.appointmentRepository.save(booking);

    return {
      status: 'success',
      message: 'Slot booked successfully',
    };
  }
}
