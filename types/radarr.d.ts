export interface RadarrWebhookPayload {
    movie: {
      id: number;
      title: string;
      year: number;
      releaseDate: string;
      folderPath: string;
      tmdbId: number;
      tags: string[];
    };
    remoteMovie: {
      tmdbId: number;
      imdbId: string;
      title: string;
      year: number;
    };
    release: {
      quality: string;
      qualityVersion: number;
      releaseGroup: string;
      releaseTitle: string;
      indexer: string;
      size: number;
      customFormatScore: number;
    };
    eventType: string;
    instanceName: string;
    applicationUrl: string;
  }
  