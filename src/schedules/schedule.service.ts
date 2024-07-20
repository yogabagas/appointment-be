import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Appointment } from '../appointments/appointment.entity';
import { format, addMinutes, parseISO } from 'date-fns';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async getAvailableSchedule(date: string): Promise<any[]> {
    const slot = await this.scheduleRepository.findOne({ where: { date } });

    if (!slot) {
      return [];
    }

    const bookedSlots = await this.appointmentRepository.find({
      where: { booked_date: date, schedule: { id: slot.id } },
    });

    const startTime = slot.start_time;
    const endTime = slot.end_time;
    const slotDuration = slot.slot_duration; // in minutes

    const slots = [];
    let currentTime = startTime;

    while (currentTime < endTime) {
      if (currentTime.length > 5) {
        currentTime = currentTime.substring(0, 5);
      }

      const isBooked = bookedSlots.some(
        (bookedSlot) => bookedSlot.booked_time.substring(0, 5) === currentTime,
      );

      slots.push({
        date,
        time: currentTime,
        available_slots: isBooked ? 0 : 1,
      });

      const [hours, minutes] = currentTime.split(':').map(Number);

      const newMinutes = minutes + slotDuration;

      currentTime = `${String(hours + Math.floor(newMinutes / 60)).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}`;
    }

    return slots;
  }

  async createSchedule(createScheduleReq: Schedule): Promise<Schedule> {
    const newSlot = this.scheduleRepository.create(createScheduleReq);
    return await this.scheduleRepository.save(newSlot);
  }
}
