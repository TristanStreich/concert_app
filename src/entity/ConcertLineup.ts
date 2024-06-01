import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Concert } from "./Concert";
import { Artist } from "./Artist";
import { Role } from "./RoleEnum";

@Entity()
export class ConcertLineup {
  @PrimaryColumn()
  concert_id: number;

  @PrimaryColumn()
  artist_id: number;

  @PrimaryColumn({ type: "enum", enum: Role })
  role: Role;

  @ManyToOne(() => Concert, concert => concert.concertLineups)
  @JoinColumn({ name: "concert_id" })
  concert: Concert;

  @ManyToOne(() => Artist, artist => artist.concertLineups)
  @JoinColumn({ name: "artist_id" })
  artist: Artist;
}