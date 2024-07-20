import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mst_schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'int' })
  slot_duration: number; // Duration in minutes

  @Column({ type: 'int' })
  slot_availibility: number;

  @Column({ type: 'date' })
  date: string;
}
