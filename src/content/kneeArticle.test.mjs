import { expect, test } from "bun:test";
import { blogArticles, blogCategories, visibleBlogArticles } from "./blogPosts.ts";
import { kneeArticle } from "./kneeArticle.ts";

test("Dr Chung assessment button opens the supplied clinic page", () => {
  expect(kneeArticle.cta.href).toBe("https://www.clynicq.com/?clinic=agksee4qjo");
});

test("Dr Chung article remains a draft excluded from production but available for preview review", () => {
  expect(kneeArticle.status).toBe("draft");
  expect(visibleBlogArticles(false).some(a => a.slug === "knee-osteoarthritis-symptoms-treatment")).toBe(false);
  expect(visibleBlogArticles(true).some(a => a.slug === "knee-osteoarthritis-symptoms-treatment")).toBe(true);
});
test("Musculoskeletal Health category and article are registered once", () => {
  expect(blogCategories.filter(c => c === "musculoskeletal-health")).toHaveLength(1);
  expect(blogArticles.filter(a => a.slug === "knee-osteoarthritis-symptoms-treatment")).toHaveLength(1);
  expect(kneeArticle.categoryKey).toBe("musculoskeletal-health");
});
test("Dr Chung authorship and supporting references stay separate", () => {
  expect(kneeArticle.author.name).toBe("Dr Chung Wing Hong");
  expect(kneeArticle.author.href).toBe("https://www.clynicq.com/?clinic=agksee4qjo");
  expect(kneeArticle.references.map(r => new URL(r.href).hostname)).toEqual(["www.healthhub.sg", "www.ace-hta.gov.sg", "www.moh.gov.sg"]);
  expect(kneeArticle.sections.flatMap(s => s.blocks).some(b => b.type === "pLink")).toBe(false);
});