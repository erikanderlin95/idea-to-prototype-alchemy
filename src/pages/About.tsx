import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#F8FBFC] py-6 md:py-14 px-4 sm:px-6 font-poppins">
      <article className="max-w-3xl mx-auto animate-fade-in">
        <header className="mb-6 md:mb-12">
          <h1 className="text-[24px] md:text-[36px] font-bold leading-tight text-[#102A43]">
            {t("about.title")}
          </h1>
        </header>

        <section className="space-y-7 md:space-y-12">
          <section>
            <h2 className="text-[16px] md:text-[22px] font-semibold text-[#163A50] mb-2 md:mb-3">
              {t("about.intro.heading")}
            </h2>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mb-2 md:mb-3">
              {t("about.intro.body1")}
            </p>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78]">
              {t("about.intro.body2")}
            </p>
          </section>

          <section>
            <h2 className="text-[16px] md:text-[22px] font-semibold text-[#163A50] mb-2 md:mb-3">
              {t("about.patients.heading")}
            </h2>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mb-2 md:mb-3">
              {t("about.patients.intro")}
            </p>
            <ul className="space-y-2 md:space-y-2.5 pl-1">
              {[
                "about.patients.bullet1",
                "about.patients.bullet2",
                "about.patients.bullet3",
                "about.patients.bullet4",
                "about.patients.bullet5",
                "about.patients.bullet6",
              ].map((key) => (
                <li key={key} className="flex items-start gap-2 md:gap-2.5 text-[14px] md:text-[16px] text-[#5F6B78]">
                  <span className="mt-1.5 md:mt-2 h-1.5 w-1.5 rounded-full bg-[#12B8C4] shrink-0" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mt-2 md:mt-3">
              {t("about.patients.disclaimer")}
            </p>
          </section>

          <section>
            <h2 className="text-[16px] md:text-[22px] font-semibold text-[#163A50] mb-2 md:mb-3">
              {t("about.providers.heading")}
            </h2>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mb-2 md:mb-3">
              {t("about.providers.body1")}
            </p>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78]">
              {t("about.providers.body2")}
            </p>
          </section>

          <section>
            <h2 className="text-[16px] md:text-[22px] font-semibold text-[#163A50] mb-2 md:mb-3">
              {t("about.partnerships.heading")}
            </h2>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mb-2 md:mb-3">
              {t("about.partnerships.body1")}
            </p>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78]">
              {t("about.partnerships.body2")}
            </p>
          </section>

          <section>
            <h2 className="text-[16px] md:text-[22px] font-semibold text-[#163A50] mb-2 md:mb-3">
              {t("about.vision.heading")}
            </h2>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#5F6B78] mb-2 md:mb-3">
              {t("about.vision.body1")}
            </p>
            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#102A43] font-semibold">
              {t("about.vision.disclaimer")}
            </p>
          </section>
        </section>

        <div className="mt-8 md:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-[#12B8C4] hover:bg-[#0FA3AE] text-white font-semibold rounded-full px-6 md:px-8 py-3.5 md:py-5 h-auto"
          >
            {t("about.browseClinics")}
          </Button>
          <Button
            onClick={() => navigate("/clinic-owners")}
            className="w-full sm:w-auto bg-[#102A43] hover:bg-[#0E2336] text-white font-semibold rounded-full px-6 md:px-8 py-3.5 md:py-5 h-auto"
          >
            {t("about.listClinic")}
          </Button>
        </div>
      </article>
    </main>
  );
};

export default About;
