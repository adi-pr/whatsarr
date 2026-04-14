import { WebhookPayload } from "../../types";
import { handlers } from "./sonarr";

export async function handleEvent(payload: WebhookPayload) {
    const event = payload.eventType;
    console.log(`Handling event: ${event}`);

    const handler = handlers[event as keyof typeof handlers];
    if (handler) {
        try {
            return await handler(payload as any);
        } catch (err: any) {
            console.error(`Error handling event ${event}:`, err);
            return { success: false, error: err.message };
        }
    } else {
        console.warn(`No handler found for event: ${event}`);
        return { success: false, error: "No handler for this event type" };
    }
}