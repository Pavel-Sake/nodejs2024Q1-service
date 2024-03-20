import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Track } from 'src/track/entities/track.entity';

@Entity('favorite-track')
export class FavoritesTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  trackId: string | null;

  @ManyToOne(() => Track, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  track: Track;
}
