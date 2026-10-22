import chooseClinic from "@/assets/blog/choose-clinic.jpg";

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
};

const p = (text: string): ArticleBlock => ({ type: "p", text });

export const blogArticles: BlogArticle[] = [
  {
    slug: "how-to-choose-a-clinic-singapore",
    categoryKey: "guide",
    title: "How to Choose the Right Clinic in Singapore: 7 Things to Consider",
    seoTitle: "How to Choose the Right Clinic in Singapore | ClynicQ",
    metaDescription:
      "Looking for a clinic in Singapore? Learn what to check before choosing a GP, physiotherapy, TCM or chiropractic clinic.",
    excerpt:
      "From choosing the right type of care to checking clinic credentials, costs and appointment options, here's what to consider before your next visit.",
    image: chooseClinic,
    imageAlt: "Patient checking clinic information on her phone outside a neighbourhood clinic",
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
  },
];

export const getBlogArticle = (slug?: string) => blogArticles.find((a) => a.slug === slug);
