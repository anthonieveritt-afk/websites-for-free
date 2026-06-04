import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | WebsitesForFree",
  description: "How WebsitesForFree uses cookies and similar technologies on our website.",
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.",
    examples: ["Session management", "Security tokens", "Load balancing"],
    required: true,
  },
  {
    name: "Analytics Cookies",
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular.",
    examples: ["Google Analytics (_ga)", "Page view tracking", "Traffic source analysis"],
    required: false,
  },
  {
    name: "Functional Cookies",
    description: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.",
    examples: ["Language preferences", "Chat widget state", "Form progress"],
    required: false,
  },
  {
    name: "Marketing Cookies",
    description: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
    examples: ["Facebook Pixel", "Google Ads", "Retargeting tags"],
    required: false,
  },
];

export default function CookiesPage() {
  return (
    <div className="pt-24">
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: 1 May 2025</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you 
              visit a website. They are widely used to make websites work, or work more efficiently, 
              as well as to provide information to website owners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">How We Use Cookies</h2>
            <p>
              We use cookies and similar technologies to improve your experience on our website, 
              analyse how our site is used, and support our marketing activities. Below is a 
              summary of the types of cookies we use.
            </p>
          </div>

          <div className="space-y-4">
            {cookieTypes.map((ct) => (
              <div key={ct.name} className="rounded-xl border border-gray-100 p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{ct.name}</h3>
                  {ct.required ? (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-semibold">Always Active</span>
                  ) : (
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-semibold">Optional</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{ct.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ct.examples.map((ex) => (
                    <span key={ex} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Managing Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that 
              are already on your computer and you can set most browsers to prevent them from 
              being placed. However, if you do this, you may have to manually adjust some 
              preferences every time you visit a site and some services and functionalities may 
              not work.
            </p>
            <p className="mt-3">
              Most browsers allow you to manage cookie preferences through their settings. Look for 
              the &quot;Privacy&quot; or &quot;Security&quot; section in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We do not 
              control these cookies and recommend reading the relevant third-party&apos;s privacy and 
              cookie policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:hello@websitesforfree.co.uk" className="text-indigo-600 hover:underline">
                hello@websitesforfree.co.uk
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
