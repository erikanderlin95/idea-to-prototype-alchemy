import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OrganizationCard from "@/components/OrganizationCard";

interface Consultant {
  id: string;
  name: string;
  title: string;
  photo_url: string | null;
  short_bio: string | null;
  areas_of_focus: string[];
}

export const FeaturedConsultants = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultants = async () => {
      const { data, error } = await supabase
        .from("consultants")
        .select("id, name, title, photo_url, short_bio, areas_of_focus")
        .eq("is_active", true)
        .limit(3);

      if (!error && data) {
        setConsultants(data);
      }
      setLoading(false);
    };

    fetchConsultants();
  }, []);

  if (loading || consultants.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{t("featuredConsultants.badge")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("featuredConsultants.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("featuredConsultants.subtitle")}
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Organization Card — first position */}
          <OrganizationCard />

          {consultants.slice(0, 2).map((consultant) => (
            <div
              key={consultant.id}
              className="group bg-card rounded-xl border border-border/50 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/consultant/${consultant.id}`)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  {consultant.photo_url ? (
                    <img
                      src={consultant.photo_url}
                      alt={consultant.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {consultant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {consultant.title}
                  </p>
                </div>
              </div>

              {consultant.short_bio && (
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {consultant.short_bio}
                </p>
              )}

              {consultant.areas_of_focus && consultant.areas_of_focus.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {consultant.areas_of_focus.slice(0, 3).map((area, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            className="group"
            onClick={() => navigate("/consultants")}
          >
            {t("featuredConsultants.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
