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
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-10">
            Launch Partners
          </h2>

          {/* Top row — Azaas */}
          <div className="flex justify-center mb-5 md:mb-6">
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
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Bottom row — clinic logos in one horizontal row */}
          <div className="flex flex-row flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
            {clinicLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-12 sm:h-14 md:h-16 shrink"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-full max-w-[80px] sm:max-w-[120px] md:max-w-[150px] w-auto object-contain transition-opacity hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
