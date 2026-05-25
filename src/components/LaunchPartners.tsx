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
    <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-background">
      <div className="container px-4 md:px-6">
        {/* Soft divider above */}
        <div className="max-w-5xl mx-auto h-px bg-border/40 mb-5 md:mb-6" />

        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-5">
            Launch Partners
          </h2>

          {/* Top row — Azaas */}
          <div className="flex justify-center mb-2 md:mb-3">
            <a
              href="https://www.azaas.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Azaas"
              className="block transition-opacity duration-300 hover:opacity-80"
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
                className="flex items-center justify-center h-[50px] sm:h-[58px] md:h-[66px] shrink"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full max-w-[76px] sm:max-w-[118px] md:max-w-[150px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
