import { client } from "../../whatsapp/client";
import type { SonarrTestPayload } from "../../../types/sonar";
import env from "../../../config/env";

export default async function onTest(payload: SonarrTestPayload) {
    console.log("Received Sonarr Test event");
    client.sendMessage(env.ALLIDS[0], `Received Sonarr Test event: ${payload.eventType}`);
    return {
        success: true,
        message: "Test event received and processed successfully"
    };
}