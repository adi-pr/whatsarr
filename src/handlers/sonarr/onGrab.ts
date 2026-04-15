import { client } from "../../whatsapp/client";
import pkg from "whatsapp-web.js";
import type { SonarrGrabPayload } from "../../../types/sonarr";
import buildImageUrl from "../../utils/buildImageUrl";
import env from "../../../config/env";

const { MessageMedia } = pkg;

export default async function onGrab(payload: SonarrGrabPayload) {
    const series = payload.series;
    const episodes = payload.episodes;
    const release = payload.release;

    const preferredImage = series.images?.find((img) => img.coverType === 'poster') ?? series.images?.[0];
    const imageUrl = preferredImage?.remoteUrl || preferredImage?.url;

    const episodeList = episodes
        .map(ep => `  - Season ${ep.seasonNumber}, Episode ${ep.episodeNumber}: "${ep.title}"`)
        .join('\n');

    const caption = `Sonarr Grab Event


Series: ${series.title}
  ID: ${series.id}
  Year: ${series.year}
  Path: ${series.path}
  Type: ${series.type}
  Tags: ${series.tags?.join(', ') || 'None'}
  TVDB ID: ${series.tvdbId}

Episodes:
${episodeList}

Release:
  Quality: ${release.quality}
  Release: ${release.releaseTitle || 'Unknown'}
  Group: ${release.releaseGroup || 'Unknown'}
  Indexer: ${release.indexer || 'Unknown'}

Event Type: ${payload.eventType}
Instance: ${payload.instanceName}
URL: ${payload.applicationUrl || 'Not provided'}`;

    if (imageUrl) {
        try {
            const media = await MessageMedia.fromUrl(
                buildImageUrl(imageUrl, payload.applicationUrl || ''),
                { unsafeMime: true }
            );

            await client.sendMessage(env.ALLIDS[0], media, { caption });
        } catch (error) {
            console.error('Failed to send grab poster image:', error);
            await client.sendMessage(env.ALLIDS[0], caption);
        }
    }

    return {
        success: true,
        message: "Grab event received and processed successfully"
    };
}