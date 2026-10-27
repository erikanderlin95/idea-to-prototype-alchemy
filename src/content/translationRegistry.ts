type Language = "en" | "zh" | "ms" | "ta";
type Dictionaries = Partial<Record<Language, Record<string, string>>>;

// Share the registry across hot reloads without pulling article content into startup.
const shared = globalThis as typeof globalThis & { __clynicqArticleTranslations?: Dictionaries };
const dictionaries = shared.__clynicqArticleTranslations ?? {};
shared.__clynicqArticleTranslations = dictionaries;

export function registerArticleTranslations(values: Dictionaries) {
  for (const language of ["en", "zh", "ms", "ta"] as const) {
    if (values[language]) dictionaries[language] = values[language];
  }
}

export function articleTranslation(language: Language, key: string): string | undefined {
  return dictionaries[language]?.[key] || dictionaries.en?.[key];
}