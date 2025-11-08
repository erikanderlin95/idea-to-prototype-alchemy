import { BarChart3, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { QueueIcon, AppointmentsIcon, ChatbotIcon } from "@/components/icons/FeatureIcons";

export const Features = () => {
  const mainFeatures = [
    {
      icon: "queue",
      title: "Digital Queue",
      subtitle: "Real-time Updates",
      description: "Join virtual queues from anywhere and see live queue status and wait times before you go.",
    },
    {
      icon: "book",
      title: "Book",
      subtitle: "Easy Appointments",
      description: "Book appointments across GP, TCM, and wellness centers with instant confirmation.",
    },
    {
      icon: "connect",
      title: "Connect",
      subtitle: "Smart Assistance",
      description: "Pre and post consultation support via AI-powered health chatbot assistance.",
    },
  ];

  const additionalFeatures = [
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
          <h2 className="text-3xl md:text-5xl font-bold">Digital Queue • Book • Connect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete healthcare platform designed for Singapore's diverse medical ecosystem
          </p>
        </div>

        {/* Main Features - Queue, Book, Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-10 rounded-2xl border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                {feature.icon === "queue" && <QueueIcon size="lg" />}
                {feature.icon === "book" && <AppointmentsIcon size="lg" />}
                {feature.icon === "connect" && <ChatbotIcon size="lg" />}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-sm font-semibold text-primary text-center mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
