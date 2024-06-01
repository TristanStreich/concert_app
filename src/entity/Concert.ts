import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ConcertLineup } from "./ConcertLineup";

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  concert_id: number;

  @Column()
  concert_date: string;  // Use string for Date type, TypeORM will handle it

  @Column()
  venue: string;

  @OneToMany(() => ConcertLineup, concertLineup => concertLineup.concert)
  concertLineups: ConcertLineup[];
}
