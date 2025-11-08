import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Calendar, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 via-accent/5 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.08),transparent_50%)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
                <Clock className="mr-2 h-4 w-4 inline" />
                Real-time Queue Updates
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Healthcare Made
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Simple & Smart
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join virtual queues, track wait times, and book appointments across GP, TCM, and wellness centers in Singapore
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="mr-2 h-5 w-5" />
              Find Clinics
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 hover:bg-secondary/50 transition-all"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl mt-12 pt-12 border-t border-border/50">
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm font-semibold">Real-time Queues</p>
              <p className="text-xs text-muted-foreground">Live updates</p>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-7 w-7 text-accent" />
              </div>
              <p className="text-sm font-semibold">Easy Booking</p>
              <p className="text-xs text-muted-foreground">Instant appointments</p>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm font-semibold">Multi-sector</p>
              <p className="text-xs text-muted-foreground">GP, TCM & Wellness</p>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-default">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="h-7 w-7 text-accent" />
              </div>
              <p className="text-sm font-semibold">Find Doctors</p>
              <p className="text-xs text-muted-foreground">Verified profiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
