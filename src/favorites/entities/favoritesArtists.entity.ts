import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Artist } from 'src/artist/entities/artist.entity';

@Entity('favorites-artists')
export class FavoritesArtists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist;
}
