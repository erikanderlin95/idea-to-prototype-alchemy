import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { localizeEyecare } from "@/content/localizeBlogs";
import { useLanguage } from "@/contexts/LanguageContext";
import imgChoosing from "@/assets/blog/choosing_the_right_vision_correction_method.jpg";
import imgLasik from "@/assets/blog/lasik_fixed_eyes_still_healthy.jpg";
import imgNerve from "@/assets/blog/a3-03-glaucoma-optic-nerve-comparison.jpg";
import imgVision from "@/assets/blog/clear_view_vs_peripheral_vision_loss.jpg";

const SITE = "https://idea-to-prototype-alchemy.lovable.app";
const SLUG = "eye-health-guide-dr-philemon-huang";

const imageMap: Record<string, string> = {
  choosing_the_right_vision_correction_method: imgChoosing,
  lasik_fixed_eyes_still_healthy: imgLasik,
  "a3-03-glaucoma-optic-nerve-comparison": imgNerve,
  clear_view_vs_peripheral_vision_loss: imgVision,
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.content;
  el.content = content;
  const element = el;
  return () => (created ? element.remove() : (element.content = prev));
};

const BlogEyecarePage = () => {
  const { t, language } = useLanguage();
  const title = t("blog.eyecare.title");
  const description = t("blog.eyecare.excerpt");
  const html = localizeEyecare(t, imageMap);

  useEffect(() => {
    const url = `${SITE}/blog/${SLUG}`;
    const image = new URL(imgChoosing, SITE).href;
    const seoTitle = `${title} | ClynicQ`;
    const prevTitle = document.title;
    document.title = seoTitle;
    const undo = [
      setMeta("name", "description", description),
      setMeta("property", "og:title", seoTitle),
      setMeta("property", "og:description", description),
      setMeta("property", "og:type", "article"),
      setMeta("property", "og:url", url),
      setMeta("property", "og:image", image),
      setMeta("name", "twitter:card", "summary_large_image"),
      setMeta("name", "twitter:title", seoTitle),
      setMeta("name", "twitter:description", description),
      setMeta("name", "twitter:image", image),
    ];
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = url;
    document.head.appendChild(canonical);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      inLanguage: language === "zh" ? "zh-Hans" : language,
      image: [image],
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "ClynicQ", url: SITE },
      publisher: {
        "@type": "Organization",
        name: "ClynicQ",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
      },
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      undo.forEach((u) => u());
      canonical.remove();
      ld.remove();
    };
  }, [title, description, language]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article lang={language === "zh" ? "zh-Hans" : language} className="container px-4 md:px-6 max-w-2xl py-6 md:py-10">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
            {t("blog.cat.eyecare")} · ClynicQ
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mb-5">{t("blog.eyecare.author")}</p>
          <img
            src={imgChoosing}
            alt={title}
            width={1200}
            height={640}
            className="w-full rounded-2xl border border-border mb-6 aspect-[15/8] object-cover"
          />
          <div
            className="blog-prose text-[15px] md:text-base text-foreground/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogEyecarePage;
