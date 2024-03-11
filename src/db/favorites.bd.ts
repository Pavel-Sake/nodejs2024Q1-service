import { v4 } from 'uuid';
import { FavoritesResponse } from 'src/favorites/interface/favs.interface';

const favorites: FavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};

async function getEntityFromFavorite(id: string, key: string) {
  const favoriteEntities = favorites[key];

  const entity = favoriteEntities.find((entity) => {
    if (entity.id === id) {
      return true;
    }
  });

  return entity;
}

function getAllFavorites() {
  return favorites;
}

function addTrackToFavoriteInBd(track) {
  //test id 46bc02f1-993a-4b22-bc42-e94b628553f9
  // b42b2a60-ea64-4a08-9f50-2ad8f14804c8
  favorites.tracks.push(track);
}

function deleteTrackFromFavoriteBd(id) {
  const tracks = favorites.tracks;

  const index = tracks.findIndex((track) => {
    if (track.id === id) {
      return true;
    }
  });

  if (index >= 0) {
    favorites.tracks.splice(index, 1);
  }
}

function addAlbumToFavoriteInBd(album) {
  //2885bd33-d5e8-4192-882c-6f07dd9669ae
  favorites.albums.push(album);
}

function deleteAlbumToFavoriteInBd(id) {
  //2885bd33-d5e8-4192-882c-6f07dd9669ae
  //favorites.albums.push(album);
  const albums = favorites.albums;

  const index = albums.findIndex((album) => {
    if (album.id === id) {
      return true;
    }

    if (index >= 0) {
      favorites.albums.splice(index, 1);
    }
  });
}

function addArtistToFavoriteInBd(artist) {
  favorites.artists.push(artist);
}

function deleteArtistToFavoriteInBd(id) {
  const artists = favorites.artists;

  const index = artists.findIndex((artist) => {
    if (artist.id === id) {
      return true;
    }

    if (index >= 0) {
      favorites.artists.splice(index, 1);
    }
  });
}

export {
  getAllFavorites,
  addTrackToFavoriteInBd,
  deleteTrackFromFavoriteBd,
  getEntityFromFavorite,
  addAlbumToFavoriteInBd,
  deleteAlbumToFavoriteInBd,
  addArtistToFavoriteInBd,
  deleteArtistToFavoriteInBd,
};
