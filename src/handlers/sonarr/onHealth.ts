import { client } from "../../whatsapp/client";
import type { SonarrHealthPayload } from "../../../types/sonarr";
import env from "../../../config/env";

export default async function onHealth(payload: SonarrHealthPayload) {

    await client.sendMessage(
        env.ALLIDS[0],
        `Sonarr Health Status: ${payload.message} \n Level: ${payload.level} \n Type: ${payload.type} \n Instance: ${payload.instanceName}`
    );

    return {
        success: true,
        message: "Health event received and processed successfully"
    };
}