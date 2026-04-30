const Privacy = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: 30 April 2026</p>
          <p className="text-sm text-muted-foreground mt-2">ClynicQ is operated by EALVON PTE LTD.</p>
        </header>

        <section className="space-y-6 text-foreground text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-2">1. What We Collect</h2>
            <p className="mb-2">We collect personal information such as your name, contact details, and submitted information when you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Join a queue or submit a booking request</li>
              <li>Submit a clinic listing, partnership, or event request</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
            <p className="mb-2">Your information is used to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Facilitate queue management and appointment coordination</li>
              <li>Process clinic listings, partnership requests, and event collaborations</li>
              <li>Communicate with you regarding your submission or request</li>
              <li>Support operational and follow-up purposes</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">3. Who We Share It With</h2>
            <p className="mb-2">Your information may be shared:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>With the clinic you selected for managing your visit</li>
              <li>Internally for coordination of listings, partnerships, or events</li>
            </ul>
            <p className="mt-2">We do not share your data for unrelated purposes without consent.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">4. Third-Party Services</h2>
            <p>We may use secure third-party service providers (such as hosting infrastructure) to support the operation of ClynicQ.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">5. Data Retention</h2>
            <p>We retain your information for up to 90 days for operational purposes, after which it is securely deleted unless required otherwise.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">6. Data Security</h2>
            <p>We implement reasonable measures to protect your data from unauthorized access.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">7. Your Rights</h2>
            <p>You may request access to, correction of, or withdrawal of consent for your personal data at any time.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">8. Contact</h2>
            <p>For any questions or requests regarding your personal data, please contact us at:</p>
            <p className="mt-1">Email: <a href="mailto:hello@ealvon.com" className="text-primary underline">hello@ealvon.com</a></p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default Privacy;
