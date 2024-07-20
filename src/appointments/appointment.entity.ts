import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Schedule } from '../schedules/schedule.entity';

@Entity('mst_appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Column({ type: 'time' })
  booked_time: string;

  @Column({ type: 'date' })
  booked_date: string;

  @Column()
  booked_by: string;
}
