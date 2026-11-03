import flyer from "@/assets/clynicq-plus-flyer-v2.jpg.asset.json";

export const ClynicQPlusFlyer = () => {
  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container px-4 md:px-6 flex justify-center">
        <a
          href={flyer.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ClynicQ+ clinic automation flyer (opens full size)"
          className="block w-full max-w-md rounded-xl overflow-hidden border border-border/50 shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
        >
          <img
            src={flyer.url}
            alt="ClynicQ+ — clinic visibility, smarter bookings, less admin. S$99/month per clinic with a 24/7 WhatsApp appointment assistant; one-time S$150 listing fee waived for GP clinics; optional Smart Waitlist add-on."
            loading="lazy"
            className="w-full h-auto"
          />
        </a>
      </div>
    </section>
  );
};
