import azaas from "@/assets/partners/azaas.jpg";
import panhealth from "@/assets/partners/panhealth.jpg";
import macquarie from "@/assets/partners/macquarie.jpg";
import ihealth from "@/assets/partners/ihealth.jpg";
import stayingSane from "@/assets/partners/staying-sane.jpg";

const clinicLogos = [
  { name: "PanHealth Medical", src: panhealth },
  { name: "Macquarie Chiropractic", src: macquarie },
  { name: "I-Health", src: ihealth },
  { name: "Staying Sane 101", src: stayingSane },
];

export const LaunchPartners = () => {
  return (
    <section className="pt-10 pb-8 md:pt-12 md:pb-10 bg-background">
      <div className="container px-4 md:px-6">
        {/* Soft divider above */}
        <div className="max-w-5xl mx-auto h-px bg-border/40 mb-8 md:mb-10" />

        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-5 md:mb-6">
            Launch Partners
          </h2>

          {/* Top row — Azaas */}
          <div className="flex justify-center mb-3 md:mb-4">
            <a
              href="https://www.azaas.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Azaas"
              className="block opacity-90 transition-opacity duration-300 hover:opacity-60"
            >
              <img
                src={azaas}
                alt="Azaas"
                loading="lazy"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Bottom row — clinic logos tightly grouped */}
          <div className="flex flex-row flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-8">
            {clinicLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-12 sm:h-14 md:h-16 shrink"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full max-w-[72px] sm:max-w-[110px] md:max-w-[140px] w-auto object-contain opacity-75"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
