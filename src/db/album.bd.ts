import { v4 } from 'uuid';
import { Album, AlbumInput } from 'src/album/interfaces/album.interface';

const albums: Album[] = [];

async function createAlbumInBd(data: AlbumInput): Promise<Album> {
  const newAlbum: Album = {
    id: v4(),
    name: data.name,
    year: data.year,
    artistId: data.artistId,
  };
  albums.push(newAlbum);
  return newAlbum;
}

async function getAllAlbumsFromBd(): Promise<Album[]> {
  return albums;
}

async function getAlbumByIdFromBd(id: string): Promise<Album> {
  const album = albums.find((album) => {
    if (album.id === id) {
      return true;
    }
  });
  return album;
}

async function updateAlbumByIdFromBd(id: string) {
  const album = albums.find((album) => {
    if (album.id === id) {
      return true;
    }
  });
  return album;
}

async function deleteAlbumByIdFromBd(id: string) {
  let index = null;
  const album = albums.find((album, idx) => {
    if (album.id === id) {
      index = idx;
      return true;
    }
  });

  if (album) {
    albums.splice(index, 1);
    return album;
  } else {
    return album;
  }
}

export {
  createAlbumInBd,
  getAllAlbumsFromBd,
  getAlbumByIdFromBd,
  updateAlbumByIdFromBd,
  deleteAlbumByIdFromBd,
};
