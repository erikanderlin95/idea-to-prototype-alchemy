import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ManagedCareModal } from "@/components/ManagedCareModal";
import { Button } from "@/components/ui/button";
import { MessageCircle, Info, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aellanPhoto from "@/assets/aellan-photo.jpg";
import erikaPhotoAsset from "@/assets/erika-photo.jpg.asset.json";
import aaydenNgAsset from "@/assets/aayden-ng.jpg.asset.json";

interface Concierge {
  id: string;
  name: string;
  title: string;
}

const OrganizationProfile = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [concierge, setConcierge] = useState<Concierge | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  useEffect(() => {
    const fetchConcierge = async () => {
      const { data } = await supabase
        .from("consultants")
        .select("id, name, title")
        .eq("is_active", true)
        .ilike("name", "%aellan%")
        .maybeSingle();
      setConcierge(
        data || {
          id: "aellan",
          name: "Aellan Choo",
          title: "Medical Concierge",
        }
      );
      setLoading(false);
    };
    fetchConcierge();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20 pb-6 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDF3F8] via-white to-white" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D2E4A] tracking-tight">
            {t("org.hereToHelp")}
          </h1>
        </div>
      </section>

      <section className="py-4 px-4 space-y-4">
        <div className="max-w-[380px] mx-auto w-full">
          <div className="rounded-2xl border border-[#D0DCE6] bg-white/90 shadow-[0_4px_20px_rgba(13,46,74,0.06)] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F7FA] text-[#0E9AAB] text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E9AAB]/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E9AAB]" />
                </span>
                {t("org.active")}
              </span>
            </div>

            <p className="text-[13px] text-[#4A5D6E] leading-snug mb-4">
              {t("org.helpDesc")}
            </p>

            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-[#D0DCE6] shrink-0 bg-[#F0F5FA]">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-[#D0DCE6]" />
                ) : (
                  <img
                    src={aellanPhoto}
                    alt={concierge?.name || "Aellan Choo"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#0D2E4A] truncate">
                  {concierge?.name || "Aellan Choo"}
                </p>
                <p className="text-[13px] text-[#4A5D6E] truncate">
                  {concierge?.title || "Medical Concierge"}
                </p>
                <p className="text-[12px] text-[#5A7089] font-medium truncate">
                  {t("org.name")}
                </p>
              </div>
              <Button
                size="icon"
                onClick={() => setShowIntakeModal(true)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-all active:scale-[0.97] shadow-[0_2px_8px_rgba(37,211,102,0.25)] shrink-0 ml-3"
                aria-label={t("org.contactCoordinator")}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[380px] mx-auto w-full">
          <div className="rounded-2xl border border-[#D0DCE6] bg-white/90 shadow-[0_4px_20px_rgba(13,46,74,0.06)] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F7FA] text-[#0E9AAB] text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E9AAB]/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E9AAB]" />
                </span>
                {t("org.active")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-[#D0DCE6] shrink-0 bg-[#F0F5FA]">
                <img
                  src={erikaPhotoAsset.url}
                  alt="Erika Ander Lin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#0D2E4A] truncate">
                  {t("org.contact2Name")}
                </p>
                <p className="text-[13px] text-[#4A5D6E] truncate">
                  {t("org.contact2Title")}
                </p>
                <p className="text-[12px] text-[#5A7089] font-medium truncate">
                  {t("org.contact2Company")}
                </p>
              </div>
              <a
                href="https://wa.me/6592206418"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-all active:scale-[0.97] shadow-[0_2px_8px_rgba(37,211,102,0.25)] shrink-0 ml-3"
                aria-label="WhatsApp Erika"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[380px] mx-auto w-full">
          <div className="rounded-2xl border border-[#D0DCE6] bg-white/90 shadow-[0_4px_20px_rgba(13,46,74,0.06)] p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F7FA] text-[#0E9AAB] text-[11px] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E9AAB]/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E9AAB]" />
                </span>
                {t("org.active")}
              </span>
            </div>

            <p className="text-[13px] text-[#4A5D6E] leading-snug mb-4">
              {t("org.contact3Desc")}
            </p>

            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-[#D0DCE6] shrink-0 bg-[#F0F5FA]">
                <img
                  src={aaydenNgAsset.url}
                  alt={t("org.contact3Name")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#0D2E4A] truncate">
                  {t("org.contact3Name")}
                </p>
                <p className="text-[13px] text-[#4A5D6E] truncate">
                  {t("org.contact3Title")}
                </p>
                <p className="text-[12px] text-[#5A7089] font-medium truncate">
                  {t("org.contact3Company")}
                </p>
              </div>
              <a
                href="https://wa.me/6591849632"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white transition-all active:scale-[0.97] shadow-[0_2px_8px_rgba(37,211,102,0.25)] shrink-0 ml-3"
                aria-label="WhatsApp Aayden Ng"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[380px] mx-auto w-full">
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

      <ManagedCareModal
        open={showIntakeModal}
        onOpenChange={setShowIntakeModal}
        clinicName="Nanyang Medical Group"
        source="organization_profile"
      />

      <Footer />
    </div>
  );
};

export default OrganizationProfile;
