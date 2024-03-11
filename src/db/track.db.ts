import { v4 } from 'uuid';
import { Track, TrackInput } from 'src/track/interfaces/track.interface';

const tracks: Track[] = [];

async function createTrackInBd(data: TrackInput): Promise<Track> {
  const newTrack: Track = {
    id: v4(),
    name: data.name,
    artistId: data.artistId,
    albumId: data.albumId,
    duration: data.duration,
  };
  tracks.push(newTrack);
  return newTrack;
}

async function getAllTrackFromBd(): Promise<Track[]> {
  return tracks;
}

async function getTrackByIdFromBd(id: string): Promise<Track> {
  const track = tracks.find((track) => {
    if (track.id === id) {
      return true;
    }
  });
  return track;
}

async function updateTrackByIdFromBd(id: string) {
  const track = tracks.find((track) => {
    if (track.id === id) {
      return true;
    }
  });
  return track;
}

async function deleteTrackByIdFromBd(id: string) {
  let index = null;
  const track = tracks.find((track, idx) => {
    if (track.id === id) {
      index = idx;
      return true;
    }
  });

  if (track) {
    tracks.splice(index, 1);
    return track;
  } else {
    return track;
  }
}

export {
  createTrackInBd,
  getAllTrackFromBd,
  getTrackByIdFromBd,
  updateTrackByIdFromBd,
  deleteTrackByIdFromBd,
};
