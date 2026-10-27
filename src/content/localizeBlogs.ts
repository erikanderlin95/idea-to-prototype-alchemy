import type { BlogArticle } from "./blogPosts";
import { eyecareTemplate } from "./eyecareTemplate";

export type Translate = (key: string) => string;

export function localizeBlogArticle(article: BlogArticle, t: Translate): BlogArticle {
  const translateValue = (value: unknown, path: string): unknown => {
    if (typeof value === "string") return t(`blog.content.${path}`);
    if (Array.isArray(value)) return value.map((item, i) => translateValue(item, `${path}.${i}`));
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key,
        ["slug", "categoryKey", "image", "clinicImage", "imagePosition", "imageFit", "status", "href", "related", "type", "name"].includes(key)
          ? item : translateValue(item, `${path}.${key}`),
      ]));
    }
    return value;
  };
  return translateValue(article, article.slug) as BlogArticle;
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

export function localizeEyecare(t: Translate, images: Record<string, string>) {
  return eyecareTemplate
    .replace(/\{\{(blog\.eyecare\.body\.\d+)\}\}/g, (_, key: string) => escapeHtml(t(key)))
    .replace(/__IMG_([a-z0-9_-]+)__/g, (_, key: string) => images[key] ?? "");
}