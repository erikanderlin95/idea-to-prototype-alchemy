import azaas from "@/assets/partners/azaas.jpg";
import everest from "@/assets/partners/everest-clinic.jpg";
import macquarie from "@/assets/partners/macquarie.png";
import ihealth from "@/assets/partners/ihealth.png";
import stayingSane from "@/assets/partners/staying-sane.jpg";
import beTcm from "@/assets/partners/be-tcm.jpg";
import myDna from "@/assets/partners/mydna.png";
import partnerTealC from "@/assets/partners/partner-teal-c.jpg";
import partner123sg from "@/assets/partners/partner-123sg.jpg";
import hovicare from "@/assets/partners/hovicare-logo.jpg";

type PartnerLogo = { name: string; src: string; href?: string; size?: "small" | "large" };

const firstRowLogos: PartnerLogo[] = [
  { name: "Hovi Care", src: hovicare, href: "https://hovicare.sg/elderly-care-services/home-care-services/?gad_source=1&gad_campaignid=23448463320&gbraid=0AAAAADJrQKbzI7c5qY_RBIgbo5sx6CxVZ&gclid=CjwKCAjw7p_UBhBlEiwAhpIs7-jRY2A8gzezdp9urdeC9pThYmHdAvvXzu80y6VfFjMnnQ45e31TeBoCgtAQAvD_BwE" },
  { name: "Everest Clinic", src: everest, size: "small" },
  { name: "Macquarie Chiropractic", src: macquarie },
  { name: "I-Health", src: ihealth, size: "large" },
  { name: "Staying Sane 101", src: stayingSane },
];

const secondRowLogos: PartnerLogo[] = [
  { name: "Be TCM Clinic", src: beTcm, size: "small" },
  { name: "myDNA", src: myDna },
  { name: "Partner", src: partnerTealC },
  { name: "123 S.G.", src: partner123sg },
];

const LogoCell = ({ logo }: { logo: PartnerLogo }) => {
  const is123 = logo.name === "123 S.G.";
  const small = logo.size === "small";
  const large = logo.size === "large";
  const widthClass = large
    ? ""
    : small
    ? "max-w-[44px] sm:max-w-[68px] md:max-w-[88px]"
    : is123
    ? "max-w-[68px] sm:max-w-[100px] md:max-w-[132px]"
    : "max-w-[54px] sm:max-w-[84px] md:max-w-[108px]";
  const heightClass = large
    ? "h-[46px] sm:h-[54px] md:h-[62px]"
    : small
    ? "h-[36px] sm:h-[40px] md:h-[44px]"
    : "";
  const cellHeight = large ? "h-[46px] sm:h-[54px] md:h-[62px]" : "h-[40px] sm:h-[46px] md:h-[52px]";
  const img = (
    <img
      src={logo.src}
      alt={logo.name}
      loading="lazy"
      className={`w-auto object-contain ${widthClass} ${heightClass ? `${heightClass} max-h-none` : "max-h-full"}`}
    />
  );
  return (
    <div className={`flex items-center justify-center ${cellHeight}`}>
      {logo.href ? (
        <a
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${logo.name}`}
          className="flex items-center justify-center h-full transition-opacity duration-300 hover:opacity-80"
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
};

export const LaunchPartners = () => {
  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container px-4 md:px-6">


        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Launch Partners
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-4 md:mb-5">
            Early clinics and partners supporting ClynicQ.
          </p>

          {/* Top row — Azaas */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-2 md:mb-3">
            <a
              href="https://www.azaas.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Azaas"
              className="flex items-center justify-center h-[58px] sm:h-[68px] md:h-[78px] transition-opacity duration-300 hover:opacity-80"
            >
              <img
                src={azaas}
                alt="Azaas"
                loading="lazy"
                className="max-h-full w-auto max-w-[88px] sm:max-w-[140px] md:max-w-[180px] object-contain"
              />
            </a>
          </div>

          {/* 5-logo row — PanHealth + Hovi Care + original first row */}
          <div className="grid grid-cols-5 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-5 md:gap-x-6 md:gap-y-6 max-w-[420px] sm:max-w-[720px] md:max-w-[880px] mx-auto mt-3">
            {firstRowLogos.map((logo) => (
              <LogoCell key={logo.name} logo={logo} />
            ))}
          </div>

          {/* 4-logo row — original second row */}
          <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-5 md:gap-x-6 md:gap-y-6 max-w-[360px] sm:max-w-[600px] md:max-w-[720px] mx-auto mt-3">
            {secondRowLogos.map((logo) => (
              <LogoCell key={logo.name} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
