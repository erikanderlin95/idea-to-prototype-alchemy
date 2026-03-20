import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ConsultantCard from "@/components/ConsultantCard";
import OrganizationCard from "@/components/OrganizationCard";
import { Input } from "@/components/ui/input";
import { Search, Users, Heart, Sparkles } from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
  areas_of_focus: string[];
}

const Consultants = () => {
  const { t } = useLanguage();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchConsultants = async () => {
      const { data, error } = await supabase
        .from("consultants")
        .select("id, name, title, photo_url, short_bio, areas_of_focus")
        .eq("is_active", true)
        .order("name");

      if (!error && data) {
        setConsultants(data);
      }
      setLoading(false);
    };

    fetchConsultants();
  }, []);

  const filteredConsultants = consultants.filter((consultant) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      consultant.name.toLowerCase().includes(searchLower) ||
      consultant.title.toLowerCase().includes(searchLower) ||
      consultant.areas_of_focus?.some((area) =>
        area.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{t("consultant.badge")}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("consultant.pageTitle")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("consultant.pageDescription")}
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("consultant.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border/50"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 px-4 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("consultant.feature1Title")}</p>
                <p className="text-sm text-muted-foreground">{t("consultant.feature1Desc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("consultant.feature2Title")}</p>
                <p className="text-sm text-muted-foreground">{t("consultant.feature2Desc")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{t("consultant.feature3Title")}</p>
                <p className="text-sm text-muted-foreground">{t("consultant.feature3Desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultants Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : filteredConsultants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Organization Card first */}
              <OrganizationCard />
              {filteredConsultants.map((consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {t("consultant.noResults")}
              </h3>
              <p className="text-muted-foreground">
                {t("consultant.noResultsDesc")}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultants;
