import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AfterlifeCard from "@/components/AfterlifeCard";
import { Heart, Flower2, Shield } from "lucide-react";

const providers = [
  {
    slug: "nirvana",
    name: "Nirvana",
    subtitle: "Memorial & Afterlife Services",
    description: "Comprehensive memorial planning, bereavement support, and afterlife services.",
  },
];

const AfterlifeServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-12 px-4 bg-gradient-to-br from-[#F6F0FA] via-background to-[#F8F4FC]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0E6F8] text-[#8B5CB8] mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">After Life Services</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            After Life Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Compassionate end-of-life planning, memorial services, and bereavement support for families.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#F0E6F8]">
                <Heart className="h-5 w-5 text-[#8B5CB8]" />
              </div>
              <div>
                <p className="font-medium text-foreground">Compassionate Care</p>
                <p className="text-sm text-muted-foreground">Dignified & respectful services</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#F0E6F8]">
                <Shield className="h-5 w-5 text-[#8B5CB8]" />
              </div>
              <div>
                <p className="font-medium text-foreground">Pre-Planning</p>
                <p className="text-sm text-muted-foreground">Advance arrangements available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50">
              <div className="p-2 rounded-full bg-[#F0E6F8]">
                <Flower2 className="h-5 w-5 text-[#8B5CB8]" />
              </div>
              <div>
                <p className="font-medium text-foreground">Family Support</p>
                <p className="text-sm text-muted-foreground">Bereavement & grief counselling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <AfterlifeCard
                key={provider.slug}
                slug={provider.slug}
                name={provider.name}
                subtitle={provider.subtitle}
                description={provider.description}
                icon={
                  <div className="flex flex-col items-center gap-0.5">
                    <Flower2 className="h-7 w-7 text-[#8B5CB8]" />
                    <span className="text-[7px] font-bold text-[#8B5CB8] tracking-wider uppercase">NVN</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AfterlifeServicesPage;
