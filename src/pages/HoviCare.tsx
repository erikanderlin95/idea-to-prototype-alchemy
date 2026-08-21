import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, HeartHandshake, Users, Sparkles } from "lucide-react";

import hovicareLogo from "@/assets/partners/hovicare-logo.jpg.asset.json";
import photoHero from "@/assets/hovicare/hovicare-1.jpg.asset.json";
import photoTable from "@/assets/hovicare/hovicare-2.jpg.asset.json";
import photoActivities from "@/assets/hovicare/hovicare-3.jpg.asset.json";
import photoWalking from "@/assets/hovicare/hovicare-4.jpg.asset.json";

const WHATSAPP = "https://wa.me/6580444649";

const HoviCare = () => {
  return (
    <div className="min-h-screen bg-[#FCFDFE]">
      <Navbar />

      {/* Hero */}
      <section className="pt-14 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F4FAFD] to-[#E8F3FA]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-full pl-1.5 pr-4 py-1 shadow-sm ring-1 ring-[#CFE4F0]">
                <img
                  src={hovicareLogo.url}
                  alt="Hovi Care logo"
                  className="w-8 h-8 rounded-full object-contain bg-white"
                />
                <span className="text-[11px] md:text-[13px] font-semibold text-[#2B7BB0] uppercase tracking-widest">
                  ClynicQ Partner
                </span>
              </div>

              <h1 className="text-[2rem] md:text-[3rem] font-bold text-[#123047] leading-[1.1] tracking-tight">
                Hovi Care
              </h1>
              <p className="text-[17px] md:text-[19px] font-semibold text-[#2B7BB0] leading-snug">
                Specialised dementia care centred around the individual
              </p>
              <p className="text-[15px] md:text-[16px] text-[#4A5C6A] leading-relaxed max-w-xl">
                Hovi Care provides person-centred care and support for seniors living with dementia.
                Our approach recognises each person's unique life story, preferences, routines and
                individual needs.
              </p>

              <Button
                asChild
                size="lg"
                className="rounded-full px-7 bg-[#2B7BB0] hover:bg-[#24688f] text-white shadow-md hover:shadow-lg transition-all gap-2"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Contact Hovi Care
                </a>
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-[0_12px_40px_rgba(18,48,71,0.12)]">
              <img
                src={photoHero.url}
                alt="Hovi Care staff interacting with seniors outdoors"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Care built around the individual */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_8px_28px_rgba(18,48,71,0.1)] order-2 md:order-1">
            <img
              src={photoTable.url}
              alt="Caregiver interacting with seniors around a table"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div className="space-y-3 order-1 md:order-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3FA] text-[#2B7BB0]">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h2 className="text-[1.5rem] md:text-[1.9rem] font-bold text-[#123047] tracking-tight">
              Care built around the individual
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#4A5C6A] leading-relaxed">
              We aim to create a safe, supportive and engaging environment where seniors can
              maintain their dignity, independence and quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Meaningful daily activities */}
      <section className="py-10 px-4 bg-[#F4FAFD]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2B7BB0]">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-[15px] md:text-[16px] text-[#4A5C6A] leading-relaxed">
              Meaningful daily activities, familiar routines, and compassionate interactions are
              important parts of the care experience.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-[0_8px_28px_rgba(18,48,71,0.1)]">
            <img
              src={photoActivities.url}
              alt="Seniors taking part in a group music activity"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Supporting seniors and their families */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_8px_28px_rgba(18,48,71,0.1)] order-2 md:order-1">
            <img
              src={photoWalking.url}
              alt="Caregiver assisting a senior while walking"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div className="space-y-3 order-1 md:order-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F3FA] text-[#2B7BB0]">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-[1.5rem] md:text-[1.9rem] font-bold text-[#123047] tracking-tight">
              Supporting seniors and their families
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#4A5C6A] leading-relaxed">
              We also understand that dementia affects the whole family. Hovi Care works closely
              with seniors and their loved ones to help them understand the available care options
              and identify support that suits their individual circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-[#E8F3FA]">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-[1.5rem] md:text-[2rem] font-bold text-[#123047] tracking-tight">
            Find the right support for your loved one
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#4A5C6A] leading-relaxed">
            Contact Hovi Care to learn more about our dementia care services and how we may support
            you or your loved one.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-7 bg-[#2B7BB0] hover:bg-[#24688f] text-white shadow-md hover:shadow-lg transition-all gap-2"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Contact Hovi Care on WhatsApp
            </a>
          </Button>
          <p className="text-[12px] text-[#7A8B99] pt-2">
            Hovi Care is the care provider. ClynicQ does not provide this care service.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HoviCare;
