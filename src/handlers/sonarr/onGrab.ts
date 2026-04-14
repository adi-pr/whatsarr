import { client } from "../../whatsapp/client";
import type { SonarrGrabPayload } from "../../../types/sonar";
import env from "../../../config/env";

export default async function onGrab(payload: SonarrGrabPayload) {
    const series = payload.series;
    const episodes = payload.episodes;
    
    const episodeList = episodes
        .map(ep => `  - Season ${ep.seasonNumber}, Episode ${ep.episodeNumber}: "${ep.title}"`)
        .join('\n');
    
    const message = `Sonarr Grab Event

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
        message: "Grab event received and processed successfully"
    };
}