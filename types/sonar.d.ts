export interface SonarrSeries {
  id: number;
  title: string;
  path: string;
  tvdbId: number;
  tvMazeId: number;
  tmdbId: number;
  type: string;
  year: number;
  tags: string[];
}

export interface SonarrEpisode {
  id: number;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  seriesId: number;
  tvdbId: number;
}

export interface SonarrRelease {
  quality: string;
  qualityVersion?: number;
  releaseGroup?: string;
  releaseTitle?: string;
  indexer?: string;
  size?: number;
}

export interface SonarrEpisodeFile {
  path: string;
  quality: string;
  size?: number;
}

export interface SonarrGrabPayload {
  eventType: "Grab";
  series: SonarrSeries;
  episodes: SonarrEpisode[];
  release: SonarrRelease;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrDownloadPayload {
  eventType: "Download";
  series: SonarrSeries;
  episodes: SonarrEpisode[];

  episodeFile: SonarrEpisodeFile;
  isUpgrade?: boolean;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrRenamePayload {
  eventType: "Rename";
  series: SonarrSeries;
  episodes: SonarrEpisode[];

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrTestPayload {
  eventType: "Test";
  series: SonarrSeries;
  episodes: SonarrEpisode[];

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrHealthPayload {
  eventType: "Health" | "HealthRestored";
  message: string;
  type: string;
  level: string;

  instanceName: string;
  applicationUrl?: string;
}

export interface SonarrManualInteractionPayload {
  eventType: "ManualInteractionRequired";
  series: SonarrSeries;

  downloadStatus: string;
  downloadStatusMessages: {
    title: string;
    messages: string[];
  }[];

  instanceName: string;
  applicationUrl: string;
}

/**
 * 🔥 Main union type
 */
export type SonarrWebhookPayload =
  | SonarrGrabPayload
  | SonarrDownloadPayload
  | SonarrRenamePayload
  | SonarrTestPayload
  | SonarrHealthPayload
  | SonarrManualInteractionPayload;