import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogArticles } from "@/content/blogPosts";
import { localizeBlogArticle, localizeEyecare } from "@/content/localizeBlogs";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import imgChoosing from "@/assets/blog/choosing_the_right_vision_correction_method.jpg";
import imgLasik from "@/assets/blog/lasik_fixed_eyes_still_healthy.jpg";
import imgNerve from "@/assets/blog/a3-03-glaucoma-optic-nerve-comparison.jpg";
import imgVision from "@/assets/blog/clear_view_vs_peripheral_vision_loss.jpg";

type Category = "eyecare" | "guide" | "visit" | "tcm";

type BlogPost = {
  id: string;
  category: Category;
  title: string;
  author: string;
  excerpt: string;
  cover: string;
  html: string;
};

const imageMap: Record<string, string> = {
  choosing_the_right_vision_correction_method: imgChoosing,
  lasik_fixed_eyes_still_healthy: imgLasik,
  "a3-03-glaucoma-optic-nerve-comparison": imgNerve,
  clear_view_vs_peripheral_vision_loss: imgVision,
};

const posts: BlogPost[] = [
  {
    id: "eye-health-guide-dr-philemon-huang",
    category: "eyecare",
    title: "Clear Vision, Healthy Eyes: Laser Correction, Glaucoma Myths & the Eye Check at 40",
    author: "Dr Philemon Huang, Senior Consultant Ophthalmologist",
    excerpt:
      "LASIK, SMILE Pro, TransPRK or ICL? An eye surgeon who had TransPRK himself explains how to choose, the myths he hears after surgery, and the eye check he recommends at 40.",
    cover: imgChoosing,
    html: "",
  },
];

const categories: ("all" | Category)[] = ["all", "visit", "tcm", "eyecare"];

export const BlogSection = () => {
  const { t, language } = useLanguage();
  const [cat, setCat] = useState<"all" | Category>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const list = useMemo(() => posts.filter((p) => cat === "all" || p.category === cat), [cat]);

  return (
    <section id="blog" lang={language === "zh" ? "zh-Hans" : language} className="py-8 md:py-12 border-t border-border/30">
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ color: "#000000" }}>
            {t("blog.title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <div className="flex gap-2 mb-4 md:mb-5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:overflow-visible">
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

        <div className="space-y-4">
          {blogArticles
            .filter((a) => cat === "all" || a.categoryKey === cat)
            .map((source) => {
              const a = localizeBlogArticle(source, t);
              return (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="block rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-primary/40 transition"
              >
                <img src={a.image} alt={a.imageAlt} width={1200} height={640} loading="lazy" className="w-full aspect-[16/9] object-cover object-center" />
                <div className="p-3.5 md:p-6 space-y-1.5 md:space-y-0">
                  <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary md:mb-2">
                    {t(`blog.cat.${a.categoryKey}`)}
                  </span>
                  <h3 className="text-base md:text-xl font-semibold text-foreground leading-snug line-clamp-2 md:line-clamp-none">{a.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary pt-1 md:pt-0">
                    {t("blog.readArticle")} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );})}
          {list.map((source) => {
            const p = { ...source, title: t("blog.eyecare.title"), author: t("blog.eyecare.author"), excerpt: t("blog.eyecare.excerpt"), html: localizeEyecare(t, imageMap) };
            const open = openId === p.id;
            return (
              <article key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                {!open && <img src={p.cover} alt={p.title} className="w-full aspect-[16/9] object-cover" loading="lazy" />}
                <div className="p-4 md:p-6">
                  <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2">
                    {t(`blog.cat.${p.category}`)}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{p.author}</p>
                  {!open && <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>}
                  {open && (
                    <div
                      className="blog-prose text-sm md:text-[15px] text-foreground/90 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: p.html }}
                    />
                  )}
                  <Button
                    variant={open ? "outline" : "default"}
                    size="sm"
                    className="mt-3 gap-1"
                    onClick={() => {
                      setOpenId(open ? null : p.id);
                      if (open) document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {open ? t("blog.less") : t("blog.read")}
                    {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
