import type { SonarrWebhookPayload } from "./sonar";
import type { RadarrWebhookPayload } from "./radarr";

export type WebhookPayload = SonarrWebhookPayload | RadarrWebhookPayload;