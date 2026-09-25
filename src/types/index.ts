export type ArtistCountry = 'argentina' | 'europa' | 'mexico' | 'brasil' | 'chile' | 'colombia';

export interface Artist {
  id: string;
  name: string;
  tag: string;
  origin: string;
  country: ArtistCountry;
  countryLabel: string;
  genre: string;
  bio: string;
  imageUrl: string;
  videoUrl?: string;
  featuredRelease: {
    title: string;
    catalogNumber: string;
    duration: string;
    bpm: string;
    key: string;
    year: string;
  };
  gridSpan?: string; // Bento layout styling class
  isResident?: boolean;
}

export interface Release {
  id: string;
  catalogNumber: string;
  title: string;
  artist: string;
  releaseDate: string;
  trackCount: number;
  duration: string;
  bpm: string;
  key: string;
  coverUrl: string;
  previewDurationSec: number;
  spotifyUrl: string;
  beatportUrl: string;
  soundcloudUrl: string;
}

export type EventStatus = 'available' | 'few_tickets' | 'sold_out';

export interface EventItem {
  id: string;
  title: string;
  venue: string;
  city: string;
  country: 'argentina' | 'mexico' | 'brasil' | 'chile' | 'colombia';
  countryLabel: string;
  flagEmoji: string;
  date: string;
  time: string;
  priceRange: string;
  status: EventStatus;
  lineup: string[];
}

export interface MerchProduct {
  id: string;
  name: string;
  priceUsd: number;
  description: string;
  imageUrl: string;
  availableSizes: string[];
  badge?: string;
  isAvailable: boolean;
  category: 'hoodies' | 'tshirts' | 'accessories' | 'vinyl';
}

export interface CartItem {
  id: string; // Unique cart item ID (combines product id and size)
  productId: string;
  name: string;
  priceUsd: number;
  size: string;
  quantity: number;
  imageUrl: string;
}

export interface RadioEpisode {
  id: string;
  episodeNumber: string;
  title: string;
  host: string;
  duration: string;
  bpm: string;
  genre: string;
  recordedAt: string;
  description: string;
  waveformUrl?: string;
}
