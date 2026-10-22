import chooseClinic from "@/assets/blog/choose-clinic.jpg";
import walkInClinic from "@/assets/blog/walk-in-clinic.jpg";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: { label?: string; text: string }[] };

export type ArticleSection = { heading: string; blocks: ArticleBlock[] };

export type BlogArticle = {
  slug: string;
  categoryKey: string; // translation key suffix, e.g. "guide"
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: ArticleSection[];
  cta: { text: string[]; button: string; href: string };
  disclaimer: string;
  related?: string[];
};

const p = (text: string): ArticleBlock => ({ type: "p", text });

export const blogArticles: BlogArticle[] = [
  {
    slug: "how-to-choose-a-clinic-singapore",
    categoryKey: "visit",
    title: "How to Choose the Right Clinic in Singapore: 7 Things to Consider",
    seoTitle: "How to Choose the Right Clinic in Singapore | ClynicQ",
    metaDescription:
      "Looking for a clinic in Singapore? Learn what to check before choosing a GP, physiotherapy, TCM or chiropractic clinic.",
    excerpt:
      "From choosing the right type of care to checking clinic credentials, costs and appointment options, here's what to consider before your next visit.",
    image: chooseClinic,
    imageAlt: "Mother and daughter at home looking up clinic options on a mobile phone",
    intro: [
      "Finding the right care shouldn't be complicated.",
      "When you're feeling unwell, dealing with an injury or looking for ongoing treatment, choosing a clinic isn't always as simple as picking the nearest one.",
      "Singapore has many healthcare options, from general practitioner (GP) clinics to physiotherapy, traditional Chinese medicine (TCM) and chiropractic services.",
      "So how do you decide which clinic is right for you?",
      "Here are seven things worth considering before your next visit.",
    ],
    sections: [
      {
        heading: "1. Choose the Right Type of Care",
        blocks: [
          p("Not every clinic provides the same services."),
          {
            type: "ul",
            items: [
              { label: "GP clinics", text: "A starting point for common illnesses, general medical consultations and preventive healthcare." },
              { label: "Physiotherapy clinics", text: "Help assess and manage movement difficulties, injuries and rehabilitation needs." },
              { label: "TCM clinics", text: "Provide traditional Chinese medicine consultations and treatments within their professional scope." },
              { label: "Chiropractic clinics", text: "Focus on musculoskeletal care, although the suitability of treatment depends on your condition." },
            ],
          },
          p("Not sure which service is appropriate? A GP can help assess your symptoms and advise whether further evaluation or referral is needed."),
        ],
      },
      {
        heading: "2. Location Matters, but Convenience Goes Beyond Distance",
        blocks: [
          p('Searching for a "clinic near me" is often the first step.'),
          p("A clinic near your home or workplace can make follow-up visits easier, particularly when you require multiple treatment sessions."),
          p("But distance isn't everything."),
          p("Consider the clinic's operating hours, appointment availability and how easy it is to plan your visit."),
          p("A clinic that's slightly further away but fits your schedule may be more convenient than one that's nearby but difficult to visit."),
        ],
      },
      {
        heading: "3. Check the Clinic's Credentials",
        blocks: [
          p("Your health deserves proper care."),
          p("Before visiting a healthcare provider, check whether the clinic and practitioner hold the relevant licences or professional registrations, where required."),
          p("In Singapore, you can refer to official healthcare directories to verify applicable healthcare service licences and professional registrations."),
          p("Don't rely entirely on social media advertisements, testimonials or promotional claims when making healthcare decisions."),
        ],
      },
      {
        heading: "4. Understand the Costs Before Your Visit",
        blocks: [
          p("Medical and therapy fees can vary between clinics."),
          p("Before making an appointment, consider asking:"),
          {
            type: "ul",
            items: [
              { text: "What is the consultation fee?" },
              { text: "Are medications, procedures or treatments charged separately?" },
              { text: "Will follow-up sessions cost the same?" },
              { text: "Are any applicable subsidies, insurance arrangements or corporate benefits accepted?" },
            ],
          },
          p("For eligible patients, certain GP and dental clinics participate in the Community Health Assist Scheme (CHAS). You can check participating clinics through the official CHAS clinic locator."),
          p("Understanding the expected costs upfront helps you make a more informed choice."),
        ],
      },
      {
        heading: "5. Check Whether the Clinic Accepts Walk-Ins or Appointments",
        blocks: [
          p("Not all clinics operate the same way."),
          p("Some GP clinics accept walk-in patients, while many physiotherapy and other therapy providers operate primarily through scheduled appointments."),
          p("Before heading down, find out how the clinic manages patient visits."),
          p("For walk-in clinics, you may want to check whether remote queue joining is available."),
          p("For appointment-based clinics, check whether advance booking is required and how appointment changes are handled."),
          p("A little planning can make your visit more convenient."),
        ],
      },
      {
        heading: "6. Look Beyond Online Reviews",
        blocks: [
          p("Reviews can provide useful insights into other patients' experiences, but they shouldn't be the only factor in your decision."),
          p("Pay attention to whether the clinic communicates clearly, explains its services and provides information relevant to your needs."),
          p("A good patient experience isn't just about friendly service. It's also about understanding your care options, knowing what to expect and being able to make informed decisions."),
        ],
      },
      {
        heading: "7. Make Your Clinic Visit Easier with Digital Tools",
        blocks: [
          p("Choosing the right clinic is one part of the experience. Planning your visit is another."),
          p("Digital healthcare tools can help patients access clinic information and, depending on the clinic, manage certain aspects of their visit."),
          p("ClynicQ is a digital platform that connects patients with participating clinics and supports clinic-specific queueing or appointment workflows."),
          p("Whether you're visiting a GP or an appointment-based healthcare provider, check what options are available at your chosen clinic."),
          p("The goal is simple: make it easier to plan your clinic visit, with less uncertainty about the process."),
        ],
      },
      {
        heading: "Conclusion: Your Healthcare Journey, Your Choice",
        blocks: [
          p("The right clinic isn't necessarily the closest, cheapest or most popular one."),
          p("It's the one that offers appropriate care for your needs, with qualified providers, clear information and a visit arrangement that works for you."),
          p("Take a little time to compare your options, ask questions and choose a provider you're comfortable with."),
        ],
      },
    ],
    cta: {
      text: [
        "Looking for a more convenient way to plan your clinic visit?",
        "Explore participating clinics on ClynicQ and discover the queueing or appointment options available for your next visit.",
      ],
      button: "Explore Clinics on ClynicQ",
      href: "/#marketplace",
    },
    disclaimer:
      "This article provides general information and is not a substitute for professional medical advice. If you have severe or potentially life-threatening symptoms, seek urgent medical attention rather than waiting for a routine clinic visit.",
    related: ["walk-in-clinics-singapore"],
  },
  {
    slug: "walk-in-clinics-singapore",
    categoryKey: "visit",
    title: "Walk-In Clinics in Singapore: What to Know Before You Visit",
    seoTitle: "Walk-In Clinics in Singapore: What to Know | ClynicQ",
    metaDescription:
      "Looking for a walk-in clinic in Singapore? Learn about clinic hours, waiting times, queue arrangements and ways to plan your visit.",
    excerpt:
      "Looking for a walk-in clinic? Learn what to check before heading down, how clinic queues work and how to plan your visit.",
    image: walkInClinic,
    imageAlt: "Patient checking queue information on a smartphone while seated in a bright clinic waiting area",
    intro: [
      "Feeling unwell and thinking of visiting a clinic?",
      "Sometimes, making an appointment isn't practical. You might wake up with a fever, develop a sudden cough or simply need to see a doctor without planning days ahead.",
      "That's where walk-in clinics come in.",
      "But before heading down, it's worth understanding how walk-in visits work, what to check and how you can make your visit more convenient.",
    ],
    sections: [
      {
        heading: "1. Can You Visit a Clinic Without an Appointment?",
        blocks: [
          p("Yes. Many general practitioner (GP) clinics in Singapore accept walk-in patients."),
          p("This means you can visit during their operating hours without booking an appointment in advance."),
          p("However, walk-in arrangements vary between clinics. Some may stop accepting registrations before closing time or limit walk-ins when demand is high."),
          p("Other healthcare providers, including physiotherapy, TCM and chiropractic clinics, may operate primarily through appointments."),
          p("Tip: Check the clinic's current operating hours and registration arrangements before travelling."),
        ],
      },
      {
        heading: "2. How to Find a Walk-In Clinic Near You",
        blocks: [
          p("When searching for a clinic, convenience is often a priority."),
          p("You might start with searches such as:"),
          { type: "ul", items: [{ text: "Walk-in clinic near me" }, { text: "GP clinic near me" }, { text: "Walk-in clinic Singapore" }, { text: "Clinic open today" }] },
          p("But the nearest clinic isn't necessarily the most suitable one."),
          p("Consider the type of care you need, the clinic's location, operating hours and whether it accepts walk-in patients."),
          p("You can also check official healthcare directories and clinic websites for relevant information."),
          p("For potentially serious or life-threatening symptoms, seek emergency medical care rather than waiting for a routine clinic consultation."),
        ],
      },
      {
        heading: "3. What Should You Check Before Heading Down?",
        blocks: [
          p("A little preparation can save you an unnecessary trip."),
          p("Here are a few things worth checking:"),
          {
            type: "ul",
            items: [
              { label: "Operating hours", text: "Some clinics operate in separate morning, afternoon and evening sessions. Registration cut-off times may differ from published closing times." },
              { label: "Walk-in availability", text: "A clinic may accept walk-ins generally but have different arrangements on certain days." },
              { label: "Consultation fees", text: "Check whether consultation fees, medications and other services are charged separately." },
              { label: "Subsidies and insurance", text: "If applicable, check whether the clinic participates in CHAS or accepts your insurance or corporate healthcare arrangements." },
              { label: "Queue arrangements", text: "Find out whether you need to register physically at the clinic or whether remote queue joining is available." },
            ],
          },
        ],
      },
      {
        heading: "4. Why Do Clinic Waiting Times Vary?",
        blocks: [
          p("Even at the same clinic, waiting times can differ from day to day."),
          p("Factors may include:"),
          { type: "ul", items: [{ text: "The number of patients ahead of you" }, { text: "Consultation duration" }, { text: "Patients requiring additional attention" }, { text: "Staffing and clinic operations" }, { text: "Appointment and walk-in arrangements" }] },
          p("A shorter queue doesn't always guarantee a shorter wait, as consultation times can vary."),
          p("If queue information is available, it may help you make a more informed decision about when to visit."),
        ],
      },
      {
        heading: "5. Can You Join a Clinic Queue Without Being There?",
        blocks: [
          p("At participating clinics, remote queueing may allow patients to join a queue before arriving."),
          p("Instead of heading straight to the clinic just to obtain a queue number, you may be able to register remotely using a supported digital platform."),
          p("Depending on the clinic's system, you may also be able to view queue information before making your way down."),
          p("However, remote queue joining does not guarantee an immediate consultation or an exact waiting time."),
          p("Always follow the clinic's registration and arrival instructions."),
        ],
      },
      {
        heading: "6. How ClynicQ Can Help You Plan Your Clinic Visit",
        blocks: [
          p("ClynicQ is a digital healthcare platform that connects patients with participating clinics."),
          p("For clinics that support remote queueing, ClynicQ allows patients to join the queue digitally and access available queue information."),
          p("ClynicQ also supports appointment-based clinic workflows, recognising that not every healthcare provider operates on a walk-in basis."),
          p("Whether you're visiting a GP or an appointment-based provider, the available options depend on the participating clinic."),
          p("The idea is simple: less uncertainty when planning your clinic visit."),
        ],
      },
      {
        heading: "7. Walk-In or Appointment: Which Is Better?",
        blocks: [
          p("Neither arrangement is automatically better."),
          p("Walk-in visits can be useful when you need a routine consultation without a prior booking, subject to clinic availability."),
          p("Appointments may be more suitable for planned consultations, follow-up treatments or services that require dedicated time."),
          p("What matters is choosing appropriate care and understanding the clinic's visit arrangements."),
        ],
      },
    ],
    cta: {
      text: [
        "Plan Your Next Clinic Visit with ClynicQ",
        "Finding a clinic is one thing. Knowing how to plan your visit is another. Explore participating clinics on ClynicQ and check the queueing or appointment options available for your next visit.",
      ],
      button: "Explore Clinics on ClynicQ",
      href: "/#marketplace",
    },
    disclaimer:
      "This article is for general informational purposes only and does not replace professional medical advice. For severe or potentially life-threatening symptoms, seek urgent medical attention.",
    related: ["how-to-choose-a-clinic-singapore"],
  },
];

export const getBlogArticle = (slug?: string) => blogArticles.find((a) => a.slug === slug);
