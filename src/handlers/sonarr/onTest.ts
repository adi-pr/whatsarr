import { client } from "../../whatsapp/client";
import type { SonarrTestPayload } from "../../../types/sonar";
import env from "../../../config/env";

export default async function onTest(payload: SonarrTestPayload) {
    console.log("Received Sonarr Test event", payload);
    
    const series = payload.series;
    const episodes = payload.episodes;
    
    const episodeList = episodes
        .map(ep => `  - Season ${ep.seasonNumber}, Episode ${ep.episodeNumber}: "${ep.title}"`)
        .join('\n');
    
    const message = `Received Sonarr Test event

Series: ${series.title}
  ID: ${series.id}
  Year: ${series.year}
  Path: ${series.path}
  Type: ${series.type}
  Tags: ${series.tags?.join(', ') || 'None'}
  TVDB ID: ${series.tvdbId}

Episodes:
${episodeList}

Event Type: ${payload.eventType}
Instance: ${payload.instanceName}
URL: ${payload.applicationUrl || 'Not provided'}`;
    
    client.sendMessage(env.ALLIDS[0], message);
    return {
        success: true,
        message: "Test event received and processed successfully"
    };
}