import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getBlogArticle, blogArticles } from "@/content/blogPosts";
import { localizeBlogArticle } from "@/content/localizeBlogs";
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
  const element = el;
  return () => (created ? element.remove() : (element.content = prev));
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const source = getBlogArticle(slug);
  const article = source ? localizeBlogArticle(source, t) : undefined;

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
       "@type": article.author ? "BlogPosting" : "Article",
      headline: article.title,
      description: article.metaDescription,
      inLanguage: language === "zh" ? "zh-Hans" : language,
      image: [image],
      mainEntityOfPage: url,
      author: article.author ? { "@type": "Person", name: article.author.name, jobTitle: article.author.designation, worksFor: { "@type": "MedicalClinic", name: article.author.clinicName, url: article.author.href } } : { "@type": "Organization", name: "ClynicQ", url: SITE },
      ...(article.tags ? { keywords: article.tags.join(", ") } : {}),
      publisher: {
        "@type": "Organization",
        name: "ClynicQ",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
      },
    });
    document.head.appendChild(ld);
    const undoRobots = article.status === "draft" ? setMeta("name", "robots", "noindex, nofollow") : undefined;
    return () => {
      document.title = prevTitle;
      undo.forEach((u) => u());
      canonical.remove();
      ld.remove();
      undoRobots?.();
    };
  }, [slug, language]);

  if (!article) return <NotFound />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article lang={language === "zh" ? "zh-Hans" : language} className="container px-4 md:px-6 max-w-2xl py-6 md:py-10">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
            {t(`blog.cat.${article.categoryKey}`)} · ClynicQ
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-5">
            {article.title}
          </h1>
          {article.author && <div className="text-sm text-muted-foreground mb-4"><p>{article.author.byline}</p><p>{article.author.designation}</p></div>}
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={640}
            className={article.imageFit === "contain" ? "w-full max-h-96 rounded-2xl border border-border mb-6 object-contain" : "w-full rounded-2xl border border-border mb-6 aspect-[15/8] object-cover"}
          />
          <div className="text-[15px] md:text-base text-foreground/90 leading-relaxed space-y-4">
            {article.intro.map((x) => <p key={x}>{x}</p>)}
            {article.sections.map((s) => (
              <section key={s.heading} className="pt-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-snug">{s.heading}</h2>
                {s.images && <div className={s.images.length > 1 ? "grid grid-cols-2 gap-3 mb-4" : "mb-4"}>
                  {s.images.map(figure => <figure key={figure.image} className="min-w-0">
                    <img src={figure.image} alt={figure.imageAlt} loading="lazy" className="w-full max-h-72 object-contain rounded-lg" />
                    <figcaption className="text-xs text-muted-foreground mt-1 leading-relaxed">{figure.caption}</figcaption>
                  </figure>)}
                </div>}
                <div className="space-y-3">
                  {s.blocks.map((b, i) =>
                    b.type === "p" ? (
                      <p key={i}>{b.text}</p>
                    ) : b.type === "h3" ? (
                      <h3 key={i} className="text-lg font-semibold text-foreground pt-2">{b.text}</h3>
                    ) : b.type === "pLink" ? (
                      <p key={i}>
                        {b.pre}
                        <Link to={b.href} className="text-primary font-medium hover:underline">{b.label}</Link>
                        {b.post}
                      </p>
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
            <Button asChild className="h-auto min-h-10 max-w-full whitespace-normal break-words py-2">
              {/^https?:\/\//.test(article.cta.href) ? (
                <a href={article.cta.href}>{article.cta.button}</a>
              ) : <Link
                to={article.cta.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" }), 400);
                }}
              >
                {article.cta.button}
              </Link>}
            </Button>
            </aside>

          {article.related && article.related.length > 0 && (
            <nav aria-label={t("blog.related")} className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">{t("blog.related")}</h2>
              <ul className="space-y-2">
                {article.related.map((rs) => {
                  const relatedSource = blogArticles.find((a) => a.slug === rs);
                  const r = relatedSource ? localizeBlogArticle(relatedSource, t) : undefined;
                  return r ? (
                    <li key={rs}>
                      <Link to={`/blog/${r.slug}`} className="text-primary font-medium hover:underline">{r.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          )}

          {article.author && <section className="mt-6 border-t border-border pt-4">
            <h2 className="text-xl font-semibold mb-3">{t("blog.aboutAuthor")}</h2>
            <div className="flex items-start gap-3">
              <img src={article.author.image} alt={article.author.imageAlt} loading="lazy" className="w-20 h-auto rounded-lg shrink-0" />
              <div className="min-w-0 text-sm space-y-1">
                <h3 className="font-semibold">{article.author.name}</h3>
                <p>{article.author.designation}</p>
                <p>{article.author.qualifications}</p>
              </div>
            </div>
            <a href={article.author.href} className="inline-block text-primary font-medium hover:underline mt-3">{article.author.clinicName}</a>
            <p className="text-sm mt-1">{article.author.address}</p>
            <img src={article.author.clinicImage} alt={article.author.clinicImageAlt} loading="lazy" className="w-full h-auto rounded-lg mt-3" />
            <p className="text-sm text-muted-foreground mt-3">{article.author.note}</p>
          </section>}
          <p className="mt-6 text-xs text-muted-foreground italic leading-relaxed">{article.disclaimer}</p>
          {article.references && <section className="mt-4 border-t border-border pt-3">
            <h2 className="text-sm font-semibold mb-2">{t("blog.singaporeReferences")}</h2>
            <ol className="list-decimal pl-5 text-xs leading-relaxed space-y-2">
              {article.references.map(reference => <li key={reference.href}><a href={reference.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{reference.label}</a></li>)}
            </ol>
          </section>}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
