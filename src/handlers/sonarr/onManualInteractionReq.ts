import { client } from "../../whatsapp/client";
import type { SonarrManualInteractionPayload } from "../../../types/sonarr";
import env from "../../../config/env";

export default async function onManualInteractionReq(payload: SonarrManualInteractionPayload) {

    await client.sendMessage(
        env.ALLIDS[0],
        `Sonarr Manual Interaction Requested: ${payload.series} \n Download Status: ${payload.downloadStatus}`
    );

    return {
        success: true,
        message: "Manual interaction event received and processed successfully"
    };
}