import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getBlogArticle, blogArticles } from "@/content/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";
import NotFound from "./NotFound";

const SITE = "https://idea-to-prototype-alchemy.lovable.app";

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
  return () => (created ? el!.remove() : (el!.content = prev));
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const article = getBlogArticle(slug);

  useEffect(() => {
    if (!article) return;
    const url = `${SITE}/blog/${article.slug}`;
    const image = new URL(article.image, SITE).href;
    const prevTitle = document.title;
    document.title = article.seoTitle;
    const undo = [
      setMeta("name", "description", article.metaDescription),
      setMeta("property", "og:title", article.seoTitle),
      setMeta("property", "og:description", article.metaDescription),
      setMeta("property", "og:type", "article"),
      setMeta("property", "og:url", url),
      setMeta("property", "og:image", image),
      setMeta("name", "twitter:card", "summary_large_image"),
      setMeta("name", "twitter:title", article.seoTitle),
      setMeta("name", "twitter:description", article.metaDescription),
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
      headline: article.title,
      description: article.metaDescription,
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
  }, [article]);

  if (!article) return <NotFound />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="container px-4 md:px-6 max-w-2xl py-6 md:py-10">
          <Link to="/wellness-talks" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Featured Wellness
          </Link>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
            {t(`blog.cat.${article.categoryKey}`)} · ClynicQ
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-5">
            {article.title}
          </h1>
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={640}
            className="w-full rounded-2xl border border-border mb-6 aspect-[15/8] object-cover"
          />
          <div className="text-[15px] md:text-base text-foreground/90 leading-relaxed space-y-4">
            {article.intro.map((x) => <p key={x}>{x}</p>)}
            {article.sections.map((s) => (
              <section key={s.heading} className="pt-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-snug">{s.heading}</h2>
                <div className="space-y-3">
                  {s.blocks.map((b, i) =>
                    b.type === "p" ? (
                      <p key={i}>{b.text}</p>
                    ) : (
                      <ul key={i} className="list-disc pl-5 space-y-1.5">
                        {b.items.map((it) => (
                          <li key={it.text}>
                            {it.label && <strong className="text-foreground">{it.label}: </strong>}
                            {it.text}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>

          <aside className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6 text-center">
            {article.cta.text.map((x, i) => (
              <p key={x} className={i === 0 ? "font-semibold text-foreground mb-1" : "text-sm text-muted-foreground mb-4"}>{x}</p>
            ))}
            <Button asChild>
              <Link
                to={article.cta.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" }), 400);
                }}
              >
                {article.cta.button}
              </Link>
            </Button>
            </aside>

          {article.related && article.related.length > 0 && (
            <nav aria-label="Related reads" className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Related Reads</h2>
              <ul className="space-y-2">
                {article.related.map((rs) => {
                  const r = blogArticles.find((a) => a.slug === rs);
                  return r ? (
                    <li key={rs}>
                      <Link to={`/blog/${r.slug}`} className="text-primary font-medium hover:underline">{r.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          )}

          <p className="mt-6 text-xs text-muted-foreground italic leading-relaxed">{article.disclaimer}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
