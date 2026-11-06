import flyer from "@/assets/clynicq-plus-poster-nov6.jpg.asset.json";

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
            alt="ClynicQ+ — Less Admin. Smarter Bookings. Proposed S$99/month per clinic for a 24/7 WhatsApp enquiry assistant, appointment booking, confirmations and reminders, with an optional S$30/month Smart Waitlist and Cancellation Backfilling add-on. Scan the QR code to register interest."
            loading="lazy"
            className="w-full h-auto"
          />
        </a>
      </div>
    </section>
  );
};
