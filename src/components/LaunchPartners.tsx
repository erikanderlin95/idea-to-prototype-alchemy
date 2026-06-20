import azaas from "@/assets/partners/azaas.jpg";
import panhealth from "@/assets/partners/panhealth.jpg";
import macquarie from "@/assets/partners/macquarie.jpg";
import ihealth from "@/assets/partners/ihealth.jpg";
import stayingSane from "@/assets/partners/staying-sane.jpg";
import beTcm from "@/assets/partners/be-tcm.jpg";
import myDnaAsset from "@/assets/partners/mydna.jpg.asset.json";

const clinicLogos = [
  { name: "PanHealth Medical", src: panhealth },
  { name: "Macquarie Chiropractic", src: macquarie },
  { name: "I-Health", src: ihealth },
  { name: "Staying Sane 101", src: stayingSane },
  { name: "Be TCM Clinic", src: beTcm },
  { name: "myDNA", src: myDnaAsset.url },
];

export const LaunchPartners = () => {
  return (
    <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-background">
      <div className="container px-4 md:px-6">
        {/* Soft divider above */}
        <div className="max-w-5xl mx-auto h-px bg-border/40 mb-5 md:mb-6" />

        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Launch Partners
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-4 md:mb-5">
            Early clinics and partners supporting ClynicQ.
          </p>

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
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-6 md:gap-x-8">
            {clinicLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-[50px] sm:h-[58px] md:h-[66px] shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className={`max-h-full w-auto object-contain ${
                    logo.name === "Be TCM Clinic" || logo.name === "myDNA"
                      ? "max-w-[80px] sm:max-w-[138px] md:max-w-[176px]"
                      : "max-w-[70px] sm:max-w-[118px] md:max-w-[150px]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
