import { client } from "../../whatsapp/client";
import pkg from "whatsapp-web.js";
import type { SonarrSeriesAddPayload } from "../../../types/sonarr";
import env from "../../../config/env";
import buildImageUrl from "../../utils/buildImageUrl";

const { MessageMedia } = pkg;

export default async function onSeriesAdd(payload: SonarrSeriesAddPayload) {
    const series = payload.series;

    const preferredImage = series.images?.find((img) => img.coverType === 'poster') ?? series.images?.[0];
    const imageUrl = preferredImage?.remoteUrl || preferredImage?.url;

    if (imageUrl) {
        try {
            const media = await MessageMedia.fromUrl(
                // buildImageUrl function to construct the full URL for the image
                buildImageUrl(imageUrl, payload.applicationUrl || ''),
                { unsafeMime: true }
            );
            await client.sendMessage(env.ALLIDS[0], media, { caption: `Series Added: ${series.title} (${series.year})` });
        } catch (error) {
            console.error('Failed to send series image:', error);
        }
    }

    return {
        success: true,
        message: "Series add event received and processed successfully"
    };
}