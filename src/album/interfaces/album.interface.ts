interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

interface AlbumInput {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export { Album, AlbumInput };
