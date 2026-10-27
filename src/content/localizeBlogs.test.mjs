import { describe, expect, test } from "bun:test";
import { blogArticles } from "./blogPosts.ts";
import { localizeBlogArticle, localizeEyecare } from "./localizeBlogs.ts";
import { blogTranslations } from "./blogTranslations.ts";
const english = blogTranslations.en;

describe("Blog language selection", () => {
  test("English lookup preserves every original article and its navigation", () => {
    const t = (key) => english[key] ?? key;
    for (const article of blogArticles) expect(localizeBlogArticle(article, t)).toEqual(article);
  });

  for (const language of ["en", "zh", "ms", "ta"]) {
    test(`${language} eyecare articles never link to OneVision and resolve the internal eye-check reference`, () => {
      const html = localizeEyecare((key) => blogTranslations[language][key] ?? key, {});
      const destinations = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
      expect(destinations.some((href) => new URL(href, "https://idea-to-prototype-alchemy.lovable.app").hostname.endsWith("onevision.com.sg"))).toBe(false);
      expect(destinations).toContain("/blog/eye-health-guide-dr-philemon-huang#eye-check");
      expect(html).toContain('id="eye-check"');
    });
    test(`${language} includes every full-blog translation entry`, () => {
      const dictionary = blogTranslations[language];
      expect(Object.keys(dictionary).sort()).toEqual(Object.keys(english).sort());
      for (const key of Object.keys(english)) expect(dictionary[key]?.trim().length).toBeGreaterThan(0);
      if (language !== "en") {
        for (const article of blogArticles) {
          expect(dictionary[`blog.content.${article.slug}.title`]).not.toBe(article.title);
          expect(dictionary[`blog.content.${article.slug}.disclaimer`]).not.toBe(article.disclaimer);
        }
        expect(dictionary["blog.eyecare.title"]).not.toBe(english["blog.eyecare.title"]);
      }
    });
    test(`${language} selection resolves the entire article without changing image or link destinations`, () => {
      const article = blogArticles.find((a) => a.slug === "tcm-singapore-first-visit");
      if (!article) throw new Error("TCM article is required");
      const result = localizeBlogArticle(article, (key) => `${language}:${key}`);
      expect(result.title).toBe(`${language}:blog.content.tcm-singapore-first-visit.title`);
      expect(result.slug).toBe("tcm-singapore-first-visit");
      expect(result.image).toBe(article.image);
      expect(result.cta.href).toBe("/#marketplace");
      expect(result.sections).toHaveLength(9);
      const sectionBlocks = result.sections[7].blocks.map((b) => b.type);
      expect(sectionBlocks).not.toContain("pLink");
      expect(result.sections[7].blocks.at(-1).text).toBe(`${language}:blog.content.tcm-singapore-first-visit.sections.7.blocks.4.text`);
      expect(result.related).toEqual(article.related);
    });
  }
});