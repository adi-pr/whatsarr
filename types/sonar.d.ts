export interface SonarrSeries {
  id: number;
  title: string;
  titleSlug?: string;
  path: string;
  tvdbId: number;
  tvMazeId?: number;
  tmdbId?: number;
  imdbId?: string;
  type: string;
  year: number;
  genres?: string[];
  images?: SonarrSeriesImage[];
  originalLanguage?: SonarrOriginalLanguage;
  tags: string[];
}

export interface SonarrSeriesImage {
  coverType: string;
  url: string;
  remoteUrl?: string;
}

export interface SonarrOriginalLanguage {
  id: number;
  name: string;
}

export interface SonarrSeriesAddSeries extends SonarrSeries {
  titleSlug: string;
  imdbId?: string;
  genres: string[];
  images: SonarrSeriesImage[];
  originalLanguage?: SonarrOriginalLanguage;
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
  sourcePath?: string;
  recycleBinPath?: string;
}

export interface SonarrCustomFormat {
  id?: number;
  name?: string;
}

export interface SonarrCustomFormatInfo {
  customFormats: SonarrCustomFormat[];
  customFormatScore: number;
}

export interface SonarrDownloadStatusMessage {
  title: string;
  messages: string[];
}

export interface SonarrDownloadInfo {
  [key: string]: unknown;
}

export interface SonarrGrabbedRelease extends SonarrRelease {
  releaseType?: string;
  indexerFlags?: number;
}

export interface SonarrRenamedEpisodeFile {
  [key: string]: unknown;
}

export interface SonarrGrabPayload {
  eventType: "Grab";
  series: SonarrSeries;
  episodes: SonarrEpisode[];
  release: SonarrRelease;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  customFormatInfo?: SonarrCustomFormatInfo;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrDownloadPayload {
  eventType: "Download";
  series: SonarrSeries;
  episodes: SonarrEpisode[];

  episodeFile?: SonarrEpisodeFile;
  episodeFiles?: SonarrEpisodeFile[];
  deletedFiles?: SonarrEpisodeFile[];

  release?: SonarrGrabbedRelease;
  sourcePath?: string;
  destinationPath?: string;
  isUpgrade?: boolean;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  customFormatInfo?: SonarrCustomFormatInfo;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrRenamePayload {
  eventType: "Rename";
  series: SonarrSeries;
  episodes?: SonarrEpisode[];
  renamedEpisodeFiles?: SonarrRenamedEpisodeFile[];

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
  wikiUrl?: string;

  instanceName: string;
  applicationUrl?: string;
}

export interface SonarrManualInteractionPayload {
  eventType: "ManualInteractionRequired";
  series: SonarrSeries;
  episodes?: SonarrEpisode[];

  downloadStatus: string;
  downloadStatusMessages: SonarrDownloadStatusMessage[];
  downloadInfo?: SonarrDownloadInfo;

  release?: SonarrGrabbedRelease;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  customFormatInfo?: SonarrCustomFormatInfo;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrSeriesAddPayload {
  eventType: "SeriesAdd";
  series: SonarrSeries;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrSeriesDeletePayload {
  eventType: "SeriesDelete";
  series: SonarrSeries;
  deletedFiles: boolean;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrEpisodeFileDeletePayload {
  eventType: "EpisodeFileDelete";
  series: SonarrSeries;
  episodes: SonarrEpisode[];
  episodeFile: SonarrEpisodeFile;
  deleteReason: string;

  instanceName: string;
  applicationUrl: string;
}

export interface SonarrApplicationUpdatePayload {
  eventType: "ApplicationUpdate";
  message: string;
  previousVersion: string;
  newVersion: string;

  instanceName: string;
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
  | SonarrManualInteractionPayload
  | SonarrSeriesAddPayload
  | SonarrSeriesDeletePayload
  | SonarrEpisodeFileDeletePayload
  | SonarrApplicationUpdatePayload;