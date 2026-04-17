import dotenv from "dotenv";

dotenv.config();

const adminNumbers = (process.env.ADMIN_NUMBERS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

const groupIds = (process.env.GROUP_ID || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

    
if (!adminNumbers.length && !groupIds.length) {
    throw new Error("Either ADMIN_NUMBERS or GROUP_ID must be configured");
}

export const env = {
    PORT: Number(process.env.PORT || 3000),
    WHATSAPP_SESSION_PATH: process.env.WHATSAPP_SESSION_PATH || "./wwebjs_cache",
    NODE_ENV: process.env.NODE_ENV || "development",
    ALLIDS: [...adminNumbers, ...groupIds],
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
    WEBHOOK_USER: process.env.WEBHOOK_USER,
    WEBHOOK_PASSWORD: process.env.WEBHOOK_PASSWORD,
};

export default env;