import { expect, test } from "bun:test";
import { blogArticles, blogCategories, externalBlogArticles } from "./blogPosts.ts";
import { blogTranslations } from "./blogTranslations.ts";

test("Afterlife category appears once in the blog filters", () => {
  expect(blogCategories.filter((c) => c === "afterlife")).toHaveLength(1);
});

test("Nirvana post joins the blog as an externally hosted Afterlife article", () => {
  const nirvana = externalBlogArticles.filter((a) => a.slug === "nirvana");
  expect(nirvana).toHaveLength(1);
  expect(nirvana[0].categoryKey).toBe("afterlife");
  expect(nirvana[0].href).toBe("https://www.nirvanalife.com.sg/why-nirvana-partners-with-healthcare-professionals-singapore-2026/");
  expect(nirvana[0].source).toBe("nirvanalife.com.sg");
  expect(nirvana[0].keys).toBe("blog.nirvana");
  expect(nirvana[0].image).toBe("https://www.nirvanalife.com.sg/wp-content/uploads/2026/07/Why-Nirvana-Memorial-Garden-Partners-with-Healthcare-Professionals-Singapore-2026.png");
});

test("The Nirvana article is not duplicated as an internal ClynicQ article", () => {
  expect(blogArticles.filter((a) => a.slug === "nirvana")).toHaveLength(0);
});

test("Nirvana card text and the Afterlife label resolve in all four languages", () => {
  for (const lang of ["en", "zh", "ms", "ta"]) {
    const dict = blogTranslations[lang];
    for (const key of ["blog.nirvana.title", "blog.nirvana.imageAlt", "blog.nirvana.excerpt", "blog.cat.afterlife"]) {
      expect(dict[key], `${lang} missing ${key}`).toBeTruthy();
    }
    if (lang !== "en") {
      expect(dict["blog.cat.afterlife"]).not.toBe(blogTranslations.en["blog.cat.afterlife"]);
      expect(dict["blog.nirvana.excerpt"]).not.toBe(blogTranslations.en["blog.nirvana.excerpt"]);
    }
  }
});
