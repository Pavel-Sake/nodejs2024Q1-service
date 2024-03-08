import { v4 } from 'uuid';
import { Artist, ArtistINput } from 'src/artist/interfaces/artist.interface';

const artists: Artist[] = [];

async function createArtistInBd(data: ArtistINput): Promise<Artist> {
  const newArtist: Artist = {
    id: v4(),
    name: data.name,
    grammy: data.grammy,
  };
  artists.push(newArtist);
  return newArtist;
}

async function getAllArtistsFromBd(): Promise<Artist[]> {
  return artists;
}

async function getArtistByIdFromBd(id: string): Promise<Artist> {
  const artist = artists.find((artist) => {
    if (artist.id === id) {
      return true;
    }
  });
  return artist;
}

async function updateArtistByIdFromBd(id: string) {
  const artist = artists.find((artist) => {
    if (artist.id === id) {
      return true;
    }
  });
  return artist;
}

async function deleteArtistByIdFromBd(id: string) {
  let index = null;
  const artist = artists.find((artist, idx) => {
    if (artist.id === id) {
      index = idx;
      return true;
    }
  });

  if (artist) {
    artists.splice(index, 1);
    return artist;
  } else {
    return artist;
  }
}

export {
  createArtistInBd,
  getAllArtistsFromBd,
  getArtistByIdFromBd,
  updateArtistByIdFromBd,
  deleteArtistByIdFromBd,
};
