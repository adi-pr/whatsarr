import type { SonarrWebhookPayload } from "./sonarr";
import type { RadarrWebhookPayload } from "./radarr";

export type WebhookPayload = SonarrWebhookPayload | RadarrWebhookPayload;