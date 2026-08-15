import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-border/40 bg-secondary/10">
      <div className="container px-4 md:px-6 py-6 md:py-8 space-y-4">
        <div className="text-center">
          <p className="text-sm font-bold text-foreground">
            🔴 {t("footer.needHelpNow")}
          </p>
          <p className="text-[13px] font-normal text-muted-foreground/90 mt-1 inline-flex flex-wrap items-center justify-center gap-x-1">
            <span>{t("footer.sosLabel")}</span>
            <a href="tel:1767" className="text-primary hover:underline font-medium">1767</a>
            <span>{t("footer.separator")}</span>
            <span>{t("footer.mindlineLabel")}</span>
            <a href="tel:1771" className="text-primary hover:underline font-medium">1771</a>
            <span>{t("footer.separator")}</span>
            <span>{t("footer.emergencyLabel")}</span>
            <a href="tel:995" className="text-primary hover:underline font-medium">995</a>
          </p>
        </div>
        <p className="text-[13px] font-normal text-muted-foreground/70 text-center">
          ClynicQ is a platform operated by EALVON PTE. LTD.
        </p>
      </div>
    </footer>
  );
};
