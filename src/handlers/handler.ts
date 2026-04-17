import { WebhookPayload } from "../../types";
import sonarrHandlers from "./sonarr";
import radarrHandlers from "./radarr";

const INSTANCES: Record<
  string,
  Record<string, (payload: any) => Promise<any>>
> = {
  Sonarr: sonarrHandlers as any,
  Radarr: radarrHandlers as any,
};

export async function handleEvent(payload: WebhookPayload) {
  const event = payload.eventType;
  const instanceName = payload.instanceName;

  console.log(`Handling event: ${event} (instance: ${instanceName})`);

  const handlers = INSTANCES[instanceName];
  if (!handlers) {
    console.warn(`Unknown instance: ${instanceName}`);
    return { success: false, error: "Unknown instance" };
  }

  const handler = handlers[event];
  if (!handler) {
    console.warn(
      `No handler found for event: ${event} (instance: ${instanceName})`,
    );
    return { success: false, error: "No handler for this event type" };
  }

  try {
    return await handler(payload as any);
  } catch (err: any) {
    console.error(
      `Error handling event ${event} for instance ${instanceName}:`,
      err,
    );
    return { success: false, error: err?.message ?? String(err) };
  }
}
