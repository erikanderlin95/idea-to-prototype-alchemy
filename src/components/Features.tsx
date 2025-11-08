import { Clock, Calendar, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time Queue Updates",
      description: "See live queue status and wait times before you go",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments across GP, TCM, and wellness centers",
    },
    {
      icon: MessageSquare,
      title: "Smart Chatbot",
      description: "Pre and post consultation assistance via automated chat",
    },
    {
      icon: BarChart3,
      title: "Doctor Transparency",
      description: "View profiles, specialties, and patient reviews",
    },
    {
      icon: Shield,
      title: "PDPA Compliant",
      description: "Your data is secure and privacy-protected",
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Reduce waiting time and streamline your healthcare journey",
    },
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose ClynicQ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare platform designed for Singapore's diverse medical ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
