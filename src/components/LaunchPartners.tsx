import azaas from "@/assets/partners/azaas.jpg";
import panhealth from "@/assets/partners/panhealth.jpg";
import macquarie from "@/assets/partners/macquarie.jpg";
import ihealth from "@/assets/partners/ihealth.jpg";
import stayingSane from "@/assets/partners/staying-sane.jpg";

const clinicLogos = [
  { name: "PanHealth", src: panhealth },
  { name: "Macquarie Chiropractic", src: macquarie },
  { name: "I-Health", src: ihealth },
  { name: "Staying Sane 101", src: stayingSane },
];

export const LaunchPartners = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-12 md:mb-16">
            Launch Partners
          </h2>

          {/* Top row — Azaas */}
          <div className="flex justify-center mb-12 md:mb-14">
            <a
              href="https://www.azaas.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Azaas"
              className="block transition-opacity hover:opacity-80"
            >
              <img
                src={azaas}
                alt="Azaas"
                loading="lazy"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </a>
          </div>

          {/* Divider */}
          <div className="mx-auto mb-12 md:mb-14 h-px w-16 bg-border/70" />

          {/* Bottom row — clinic logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-x-12 items-center justify-items-center">
            {clinicLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-16 md:h-20 w-full"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full max-w-[160px] w-auto object-contain transition-opacity hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
