interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

interface ArtistINput {
  name: string;
  grammy: boolean;
}

export { Artist, ArtistINput };
