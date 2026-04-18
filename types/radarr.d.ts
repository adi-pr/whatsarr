export interface RadarrImage {
  coverType?: string;
  url?: string;
  remoteUrl?: string;
}

export interface RadarrMovie {
  id: number;
  title: string;
  titleSlug?: string;
  year?: number;
  path?: string;
  folderPath?: string;
  releaseDate?: string;
  sizeOnDisk?: number;
  tmdbId?: number;
  imdbId?: string;
  genres?: string[];
  images?: RadarrImage[];
  tags?: string[];
}

export interface RadarrRemoteMovie {
  tmdbId?: number;
  imdbId?: string;
  title?: string;
  year?: number;
  // In Radarr remote movie can contain custom format info and other fields.
  // Keep flexible for unknown fields coming from indexers.
  [key: string]: unknown;
}

export interface RadarrRelease {
  indexer?: string;
  quality?: string;
  qualityVersion?: number;
  releaseGroup?: string;
  releaseTitle?: string;
  size?: number;
}

export interface RadarrGrabbedRelease extends RadarrRelease {
  releaseType?: string;
  indexerFlags?: number;
}

export interface RadarrMovieFile {
  id?: number;
  relativePath?: string;
  path?: string;
  quality?: string;
  qualityVersion?: number;
  size?: number;
  sourcePath?: string;
  recycleBinPath?: string;
}

export interface RadarrCustomFormat {
  id?: number;
  name?: string;
}

export interface RadarrCustomFormatInfo {
  customFormats: RadarrCustomFormat[];
  customFormatScore: number;
}

export interface RadarrDownloadStatusMessage {
  title: string;
  messages: string[];
}

export interface RadarrDownloadClientItem {
  // Download client payloads vary by client. Keep shape flexible.
  [key: string]: unknown;
}

export interface RadarrRenamedMovieFile {
  oldPath?: string;
  newPath?: string;
  movieFile?: RadarrMovieFile;
}

/* Payload interfaces */

export interface RadarrGrabPayload {
  eventType: "Grab" | "Test";
  instanceName: string;
  applicationUrl: string;

  movie?: RadarrMovie;
  remoteMovie?: RadarrRemoteMovie;
  release?: RadarrRelease;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  customFormatInfo?: RadarrCustomFormatInfo;
}

export interface RadarrDownloadPayload {
  eventType: "Download";
  instanceName: string;
  applicationUrl: string;

  movie?: RadarrMovie;
  remoteMovie?: RadarrRemoteMovie;
  movieFile?: RadarrMovieFile;
  deletedFiles?: RadarrMovieFile[];

  release?: RadarrGrabbedRelease;
  isUpgrade?: boolean;

  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  customFormatInfo?: RadarrCustomFormatInfo;

  // When files were replaced/removed during import, source path provided on WebhookMovieFile in some cases
  sourcePath?: string;
}

export interface RadarrAddedPayload {
  eventType: "MovieAdded";
  instanceName: string;
  applicationUrl: string;

  movie: RadarrMovie;
  addMethod?: string;
}

export interface RadarrMovieFileDeletePayload {
  eventType: "MovieFileDelete";
  instanceName: string;
  applicationUrl: string;

  movie?: RadarrMovie;
  movieFile?: RadarrMovieFile;
  deleteReason?: string;
}

export interface RadarrMovieDeletePayload {
  eventType: "MovieDelete";
  instanceName: string;
  applicationUrl: string;

  movie?: RadarrMovie;
  deletedFiles: boolean;
  movieFolderSize?: number;
}

export interface RadarrRenamePayload {
  eventType: "Rename";
  instanceName: string;
  applicationUrl: string;

  movie?: RadarrMovie;
  renamedMovieFiles?: RadarrRenamedMovieFile[];
}

export interface RadarrHealthPayload {
  eventType: "Health" | "HealthRestored";
  instanceName: string;
  applicationUrl?: string;

  level: string;
  message: string;
  type: string;
  wikiUrl?: string;
}

export interface RadarrApplicationUpdatePayload {
  eventType: "ApplicationUpdate";
  instanceName: string;
  applicationUrl?: string;

  message: string;
  previousVersion: string;
  newVersion: string;
}

export interface RadarrManualInteractionPayload {
  eventType: "ManualInteractionRequired";
  instanceName: string;
  applicationUrl?: string;

  movie?: RadarrMovie;
  downloadInfo?: RadarrDownloadClientItem;
  downloadClient?: string;
  downloadClientType?: string;
  downloadId?: string;
  downloadStatus?: string;
  downloadStatusMessages?: RadarrDownloadStatusMessage[];
  customFormatInfo?: RadarrCustomFormatInfo;
  release?: RadarrGrabbedRelease;
}

/* Main union type */
export type RadarrWebhookPayload =
  | RadarrGrabPayload
  | RadarrDownloadPayload
  | RadarrRenamePayload
  | RadarrAddedPayload
  | RadarrMovieDeletePayload
  | RadarrMovieFileDeletePayload
  | RadarrHealthPayload
  | RadarrManualInteractionPayload
  | RadarrApplicationUpdatePayload;
