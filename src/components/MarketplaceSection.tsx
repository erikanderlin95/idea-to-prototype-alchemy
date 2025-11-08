import { SearchFilters } from "./SearchFilters";
import { ClinicCard } from "./ClinicCard";

export const MarketplaceSection = () => {
  const clinics = [
    {
      name: "Unity Health Clinic",
      type: "GP" as const,
      address: "123 Orchard Road, #01-45",
      queueCount: 4,
      waitTime: "15-20 min",
      rating: 4.8,
      isOpen: true,
    },
    {
      name: "Harmony TCM Centre",
      type: "TCM" as const,
      address: "456 Tanjong Pagar Road, #02-12",
      queueCount: 2,
      waitTime: "10-15 min",
      rating: 4.9,
      isOpen: true,
    },
    {
      name: "Wellness Plus Clinic",
      type: "Wellness" as const,
      address: "789 Jurong East Street 21",
      queueCount: 12,
      waitTime: "45-60 min",
      rating: 4.6,
      isOpen: true,
    },
    {
      name: "Care+ Medical",
      type: "GP" as const,
      address: "321 Hougang Avenue 3, #01-89",
      queueCount: 7,
      waitTime: "25-30 min",
      rating: 4.7,
      isOpen: true,
    },
    {
      name: "East Coast TCM",
      type: "TCM" as const,
      address: "654 East Coast Road, #03-05",
      queueCount: 0,
      waitTime: "Walk-in",
      rating: 4.5,
      isOpen: false,
    },
    {
      name: "Peak Wellness Center",
      type: "Wellness" as const,
      address: "987 Bukit Timah Road, #02-34",
      queueCount: 5,
      waitTime: "20-25 min",
      rating: 4.8,
      isOpen: true,
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Find Your Clinic</h2>
            <p className="text-muted-foreground">
              Browse clinics near you with real-time queue information
            </p>
          </div>

          <SearchFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic, index) => (
              <ClinicCard key={index} {...clinic} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
