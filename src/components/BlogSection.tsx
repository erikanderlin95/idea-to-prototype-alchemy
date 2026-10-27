import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogArticles } from "@/content/blogPosts";
import { localizeBlogArticle } from "@/content/localizeBlogs";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type Category = "guide" | "visit" | "tcm";

const categories: ("all" | Category)[] = ["all", "visit", "tcm"];

type BlogCardProps = {
  to: string;
  image: string;
  imageAlt: string;
  categoryKey: string;
  title: string;
  excerpt: string;
  imagePosition?: string;
};

const BlogCard = ({ to, image, imageAlt, categoryKey, title, excerpt, imagePosition }: BlogCardProps) => {
  const { t } = useLanguage();
  return (
    <Link
      to={to}
      className="group flex md:block rounded-xl md:rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition"
    >
      <img
        src={image}
        alt={imageAlt}
        width={1200}
        height={640}
        loading="lazy"
        className={cn(
          "w-28 sm:w-32 md:w-full shrink-0 aspect-[4/3] md:aspect-[16/9] object-cover self-stretch md:self-auto",
          imagePosition ?? "object-center"
        )}
      />
      <div className="flex-1 min-w-0 p-2.5 md:p-5 flex flex-col gap-1 md:gap-1.5">
        <span className="inline-block self-start text-[9.5px] md:text-[10.5px] font-bold uppercase tracking-wider px-1.5 md:px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {categoryKey}
        </span>
        <h3 className="text-[13.5px] md:text-xl font-semibold text-foreground leading-snug line-clamp-2 md:line-clamp-none group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">{excerpt}</p>
        <span className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-primary mt-auto pt-0.5 md:pt-0">
          {t("blog.readArticle")} <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </span>
      </div>
    </Link>
  );
};

export const BlogSection = () => {
  const { t, language } = useLanguage();
  const [cat, setCat] = useState<"all" | Category>("all");
  const list = useMemo(() => blogArticles.filter((a) => cat === "all" || a.categoryKey === cat), [cat]);

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

        <div className="space-y-2.5 md:space-y-4">
          {list.map((source) => {
            const a = localizeBlogArticle(source, t);
            return (
              <BlogCard
                key={a.slug}
                to={`/blog/${a.slug}`}
                image={a.image}
                imageAlt={a.imageAlt}
                categoryKey={t(`blog.cat.${a.categoryKey}`)}
                title={a.title}
                excerpt={a.excerpt}
                imagePosition={a.imagePosition}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
