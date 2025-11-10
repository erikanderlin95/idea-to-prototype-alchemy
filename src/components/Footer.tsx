import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-border/40 bg-secondary/20">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                <ClipboardList className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold">
                Clynic<span className="text-primary">Q</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.forPatients")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.findClinics")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.howItWorks")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.faq")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.forClinics")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.joinPlatform")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.features")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.pricing")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.aboutUs")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.privacyPolicy")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.termsOfService")}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
