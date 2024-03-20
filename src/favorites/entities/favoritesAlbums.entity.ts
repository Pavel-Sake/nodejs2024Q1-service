import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Album } from 'src/album/entities/album.entity';

@Entity('favorites-albums')
export class FavoritesAlbums {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: Album;
}
