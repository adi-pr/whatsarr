import { client } from "../../whatsapp/client";
import pkg from "whatsapp-web.js";
import type { RadarrGrabPayload } from "../../../types/radarr";
import buildImageUrl from "../../utils/buildImageUrl";
import env from "../../../config/env";

const { MessageMedia } = pkg;

export default async function onGrab(payload: RadarrGrabPayload) {
  const { movie } = payload
  
  const preferedImage = movie?.images?.find((img) => img.coverType === "poster") ?? movie?.images?.[0]
  const imageUrl = preferedImage?.remoteUrl || preferedImage?.url
  
  const caption = `Radarr Grab Event
    
ID: ${movie?.id}
Title: ${movie?.title}
Year: ${movie?.year}
Release Date: ${movie?.releaseDate}
TVDB ID: ${movie?.tmdbId}`
  
  
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