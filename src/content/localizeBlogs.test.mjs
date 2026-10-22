import { describe, expect, test } from "bun:test";
import { blogArticles } from "./blogPosts.ts";
import { localizeBlogArticle } from "./localizeBlogs.ts";
import english from "./blogTranslations.en.json" with { type: "json" };

describe("Blog language selection", () => {
  test("English lookup preserves every original article and its navigation", () => {
    const t = (key) => english[key] ?? key;
    for (const article of blogArticles) expect(localizeBlogArticle(article, t)).toEqual(article);
  });

  for (const language of ["en", "zh", "ms", "ta"]) {
    test(`${language} selection resolves the entire article without changing image or link destinations`, () => {
      const article = blogArticles.find((a) => a.slug === "tcm-singapore-first-visit");
      if (!article) throw new Error("TCM article is required");
      const result = localizeBlogArticle(article, (key) => `${language}:${key}`);
      expect(result.title).toBe(`${language}:blog.content.tcm-singapore-first-visit.title`);
      expect(result.slug).toBe("tcm-singapore-first-visit");
      expect(result.image).toBe(article.image);
      expect(result.cta.href).toBe("/#marketplace");
      expect(result.sections).toHaveLength(9);
      expect(result.sections[7].blocks.filter((b) => b.type === "pLink").map((b) => b.type === "pLink" ? b.href : "")).toEqual(["/tcm", "/tcm"]);
      expect(result.related).toEqual(article.related);
    });
  }
});