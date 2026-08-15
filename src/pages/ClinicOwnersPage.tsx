import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClinicConversion } from "@/components/ClinicConversion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Info, ChevronRight } from "lucide-react";

const ClinicOwnersPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ClinicConversion />
        <section className="px-4 pb-6 md:pb-8">
          <div className="max-w-5xl mx-auto">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigate("/about");
              }}
              className="group flex items-center justify-between py-2.5 px-3 -mx-3 font-poppins text-sm font-semibold text-[#102A43] hover:bg-[#12B8C4]/10 active:bg-[#12B8C4]/15 transition-colors rounded-lg"
            >
              <span className="flex items-center gap-2.5">
                <Info className="h-4 w-4 text-[#12B8C4]" strokeWidth={2.5} />
                {t("sidebar.aboutUs")}
              </span>
              <ChevronRight className="h-4 w-4 text-[#12B8C4] transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClinicOwnersPage;
