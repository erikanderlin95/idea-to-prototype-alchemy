import { useLanguage } from "@/contexts/LanguageContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import sgimed from "@/assets/partners/sgimed.jpg";

const Dot = () => (
  <span className="text-muted-foreground/50 select-none text-lg">·</span>
);

export const ConnectVia = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto h-px bg-border/40 mb-6 md:mb-8" />
        <h2 className="text-center text-lg md:text-xl font-semibold text-foreground mb-5 md:mb-6">
          {t("connectVia.title")}
        </h2>
        <div className="flex items-center justify-center gap-3.5 sm:gap-5 flex-wrap">
          <a
            href="https://sgimed.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit SGiMED"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={sgimed}
              alt="SGiMED"
              loading="lazy"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain rounded-md"
            />
          </a>
          <Dot />
          <span className="text-base sm:text-lg text-muted-foreground">Plato</span>
          <Dot />
          <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          <Dot />
          <span className="text-base sm:text-lg text-muted-foreground">
            {t("connectVia.bookingLinks")}
          </span>
        </div>
      </div>
    </section>
  );
};
