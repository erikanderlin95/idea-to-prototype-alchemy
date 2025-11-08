import { Clock, Calendar, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-2">Features</Badge>
          <h2 className="text-3xl md:text-5xl font-bold">Why Choose ClynicQ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare platform designed for Singapore's diverse medical ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
