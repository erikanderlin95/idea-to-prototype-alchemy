import { Button } from "@/components/ui/button";
import { Search, Clock, Calendar, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Healthcare Made
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Simple & Smart
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find clinics, view real-time queues, and book appointments across GP, TCM, and wellness centers in Singapore
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              <Search className="mr-2 h-5 w-5" />
              Find Clinics
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl mt-12 pt-12 border-t border-border">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Real-time Queues</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Easy Booking</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Multi-sector</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Find Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
