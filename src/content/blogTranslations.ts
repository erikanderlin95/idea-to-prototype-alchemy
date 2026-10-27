import en from "./blogTranslations.en.json";
import zh from "./blogTranslations.zh.json";
import ms from "./blogTranslations.ms.json";
import ta from "./blogTranslations.ta.json";
import kneeEn from "./kneeTranslations.en.json";
import kneeZh from "./kneeTranslations.zh.json";
import kneeMs from "./kneeTranslations.ms.json";
import kneeTa from "./kneeTranslations.ta.json";

export const blogTranslations: Record<"en" | "zh" | "ms" | "ta", Record<string, string>> = {
  en: { ...en, ...kneeEn }, zh: { ...zh, ...kneeZh }, ms: { ...ms, ...kneeMs }, ta: { ...ta, ...kneeTa },
};