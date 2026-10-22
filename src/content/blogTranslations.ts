import en from "./blogTranslations.en.json";
import zh from "./blogTranslations.zh.json";
import ms from "./blogTranslations.ms.json";
import ta from "./blogTranslations.ta.json";

export const blogTranslations: Record<"en" | "zh" | "ms" | "ta", Record<string, string>> = { en, zh, ms, ta };