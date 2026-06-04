import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | YourWebsiteNow",
  description: "Terms and conditions for YourWebsiteNow website design and hosting services, including the free trial and monthly subscription.",
};

export default function TermsPage() {
  return (
    <div className="pt-24">
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm">Last updated: 1 May 2025</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">1. Agreement</h2>
            <p>
              By submitting an application or using any services provided by YourWebsiteNow 
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms and Conditions. 
              Please read them carefully before proceeding.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">2. The Free Trial</h2>
            <p>
              2.1 Subject to these terms, we will design and build a website for you at no upfront 
              cost. You will receive a 10-day free trial during which your website will be live and 
              accessible.
            </p>
            <p className="mt-2">
              2.2 No payment details are required to start your free trial. The trial begins on 
              the date your website goes live.
            </p>
            <p className="mt-2">
              2.3 At the end of the 10-day trial period, you may choose to continue with a paid 
              monthly subscription or cancel. If you do not notify us that you wish to continue, 
              your website will be taken offline.
            </p>
            <p className="mt-2">
              2.4 The free trial is available once per business. We reserve the right to decline 
              applications at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">3. Monthly Subscription</h2>
            <p>
              3.1 If you choose to continue after your free trial, you will be charged the applicable 
              monthly subscription fee as agreed. Fees are payable in advance on a monthly basis.
            </p>
            <p className="mt-2">
              3.2 Your subscription will continue until cancelled. You may cancel at any time by 
              notifying us in writing (email is acceptable). Cancellation takes effect at the end 
              of the current billing period.
            </p>
            <p className="mt-2">
              3.3 We reserve the right to change our pricing with 30 days&apos; notice. You may cancel 
              within this notice period if you do not agree to the new pricing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">4. What&apos;s Included</h2>
            <p>
              4.1 Your monthly subscription includes: website hosting, SSL certificate, regular 
              backups, security monitoring, and email support. Additional features vary by plan 
              as set out on our pricing page.
            </p>
            <p className="mt-2">
              4.2 We will build your website based on information you provide in your application. 
              You are responsible for providing accurate and complete information.
            </p>
            <p className="mt-2">
              4.3 We include up to 2 rounds of revisions as part of the initial build. Subsequent 
              changes may incur additional fees depending on your plan.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">5. Your Content</h2>
            <p>
              5.1 You retain ownership of all content you provide to us (text, images, logos, etc.). 
              By providing content, you grant us a licence to use it for the purposes of building 
              and maintaining your website.
            </p>
            <p className="mt-2">
              5.2 You warrant that you have the right to use all content you provide and that it 
              does not infringe any third-party rights.
            </p>
            <p className="mt-2">
              5.3 You must not provide or request content that is unlawful, defamatory, offensive, 
              or infringes any rights.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">6. Intellectual Property</h2>
            <p>
              6.1 The website design, code, and materials we create remain our property until all 
              outstanding fees are paid. Upon full payment, you receive a licence to use the website 
              as a hosted service.
            </p>
            <p className="mt-2">
              6.2 If you cancel your subscription, your website will be taken offline. You do not 
              have the right to export or host the website elsewhere unless specifically agreed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              7.1 We provide our services &quot;as is&quot; and make no warranties about uptime, fitness 
              for purpose, or results from using our services.
            </p>
            <p className="mt-2">
              7.2 Our total liability to you in connection with these terms shall not exceed the 
              amount you have paid us in the three months preceding any claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">8. Termination</h2>
            <p>
              We reserve the right to terminate your subscription immediately if you breach these 
              terms, fail to pay, or misuse our services. You may cancel at any time as described 
              in section 3.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">9. Governing Law</h2>
            <p>
              These terms are governed by English law. Any disputes will be subject to the 
              exclusive jurisdiction of the English courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">10. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:hello@yourwebsitenow.co.uk" className="text-indigo-600 hover:underline">
                hello@yourwebsitenow.co.uk
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
