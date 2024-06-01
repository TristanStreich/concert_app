import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ConcertLineup } from "./ConcertLineup";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column({ unique: true })
  artist_name: string;

  @OneToMany(() => ConcertLineup, concertLineup => concertLineup.artist)
  concertLineups: ConcertLineup[];
}
