import { client } from "../../whatsapp/client";
import type { SonarrTestPayload } from "../../../types/sonar";

export default async function onTest(payload: SonarrTestPayload) {
    console.log("Received Sonarr Test event");
    client.sendMessage("120363425693415045@g.us", `Received Sonarr Test event: ${payload.eventType}`);
    return {
        success: true,
        message: "Test event received and processed successfully"
    };
}