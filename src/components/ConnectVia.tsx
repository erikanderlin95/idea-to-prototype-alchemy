import { useLanguage } from "@/contexts/LanguageContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import sgimed from "@/assets/partners/sgimed.jpg.asset.json";

const Dot = () => <span className="text-muted-foreground/50 select-none">·</span>;

export const ConnectVia = () => {
  const { t } = useLanguage();

  return (
    <section className="pb-8 md:pb-10 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto h-px bg-border/40 mb-4 md:mb-5" />
        <h2 className="text-center text-sm md:text-base font-semibold text-foreground mb-3">
          {t("connectVia.title")}
        </h2>
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
          <a
            href="https://sgimed.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit SGiMED"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={sgimed.url}
              alt="SGiMED"
              loading="lazy"
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </a>
          <Dot />
          <span className="text-[13px] sm:text-sm text-muted-foreground">Plato</span>
          <Dot />
          <WhatsAppIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          <Dot />
          <span className="text-[13px] sm:text-sm text-muted-foreground">
            {t("connectVia.bookingLinks")}
          </span>
        </div>
      </div>
    </section>
  );
};
