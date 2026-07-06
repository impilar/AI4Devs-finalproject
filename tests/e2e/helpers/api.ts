import { e2eApiUrl } from "../config/ports.js";

export const API_URL = process.env.PLAYWRIGHT_API_URL ?? e2eApiUrl;
