import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogArticles } from "@/content/blogPosts";
import { localizeBlogArticle } from "@/content/localizeBlogs";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import imgChoosing from "@/assets/blog/choosing_the_right_vision_correction_method.jpg";

type Category = "eyecare" | "guide" | "visit" | "tcm";

const categories: ("all" | Category)[] = ["all", "visit", "tcm", "eyecare"];

export const BlogSection = () => {
  const { t, language } = useLanguage();
  const [cat, setCat] = useState<"all" | Category>("all");
  const list = useMemo(() => blogArticles.filter((a) => cat === "all" || a.categoryKey === cat), [cat]);
  const showEyecare = cat === "all" || cat === "eyecare";

  return (
    <section id="blog" lang={language === "zh" ? "zh-Hans" : language} className="py-6 md:py-10 border-t border-border/30">
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ color: "#000000" }}>
            {t("blog.title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <div className="flex gap-2 mb-3 md:mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:overflow-visible">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 whitespace-nowrap px-3 py-1 md:px-3.5 md:py-1.5 rounded-full text-xs font-semibold border transition-colors",
                cat === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground/80 border-border hover:border-primary/50"
              )}
            >
              {t(`blog.cat.${c}`)}
            </button>
          ))}
        </div>

        <div className="space-y-3 md:space-y-4">
          {list.map((source) => {
            const a = localizeBlogArticle(source, t);
            return (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="block rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition"
              >
                <img src={a.image} alt={a.imageAlt} width={1200} height={640} loading="lazy" className={cn("w-full aspect-[16/9] object-cover", a.imagePosition ?? "object-center")} />
                <div className="p-3 md:p-6 space-y-1.5 md:space-y-0">
                  <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary md:mb-2">
                    {t(`blog.cat.${a.categoryKey}`)}
                  </span>
                  <h3 className="text-base md:text-xl font-semibold text-foreground leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary pt-1 md:pt-0">
                    {t("blog.readArticle")} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
          {showEyecare && (
            <Link
              to="/blog/eye-health-guide-dr-philemon-huang"
              className="block rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition"
            >
              <img src={imgChoosing} alt={t("blog.eyecare.title")} width={1200} height={640} loading="lazy" className="w-full aspect-[16/9] object-cover object-center" />
              <div className="p-3 md:p-6 space-y-1.5 md:space-y-0">
                <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary md:mb-2">
                  {t("blog.cat.eyecare")}
                </span>
                <h3 className="text-base md:text-xl font-semibold text-foreground leading-snug">{t("blog.eyecare.title")}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">{t("blog.eyecare.excerpt")}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary pt-1 md:pt-0">
                  {t("blog.readArticle")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
