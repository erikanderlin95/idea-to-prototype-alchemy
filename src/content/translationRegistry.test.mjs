import { test } from "node:test";
import assert from "node:assert/strict";
import { articleTranslation, registerArticleTranslations } from "./translationRegistry.ts";

test("registered translations preserve selected language and allow explicit English fallback", () => {
  registerArticleTranslations({ en: { "registry.test": "English", "registry.fallback": "Fallback" }, zh: { "registry.test": "中文" } });
  assert.equal(articleTranslation("zh", "registry.test"), "中文");
  assert.equal(articleTranslation("zh", "registry.fallback") || articleTranslation("en", "registry.fallback"), "Fallback");
  assert.equal(articleTranslation("ta", "registry.missing"), undefined);
});

test("lazy dictionaries register every original blog translation", async () => {
  const { blogTranslations } = await import("./blogTranslations.ts");
  for (const language of ["en", "zh", "ms", "ta"]) {
    for (const [key, value] of Object.entries(blogTranslations[language])) {
      assert.equal(articleTranslation(language, key), value, `${language}: ${key}`);
    }
  }
});