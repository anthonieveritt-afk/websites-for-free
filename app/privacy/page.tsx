import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WebsitesForFree",
  description: "WebsitesForFree privacy policy — how we collect, use, and protect your personal data in compliance with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: 1 May 2025</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-gray max-w-none">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">1. Who We Are</h2>
              <p>
                WebsitesForFree (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is registered in England and Wales. We operate 
                the website at websitesforfree.co.uk and provide website design and hosting services. 
                We are the data controller for personal information collected through our website and services.
              </p>
              <p className="mt-2">Contact: hello@websitesforfree.co.uk</p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">2. What Data We Collect</h2>
              <p>We may collect the following types of personal data:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Identity data:</strong> Name, business name</li>
                <li><strong>Contact data:</strong> Email address, phone number</li>
                <li><strong>Application data:</strong> Information you provide when applying for a website (industry, goals, features)</li>
                <li><strong>Technical data:</strong> IP address, browser type, device information, pages visited</li>
                <li><strong>Usage data:</strong> How you interact with our website</li>
                <li><strong>Marketing data:</strong> Preferences for receiving marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">3. How We Use Your Data</h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>To process your website application and build your website</li>
                <li>To communicate with you about your project</li>
                <li>To send you important service updates and notifications</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To send marketing communications (only with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">4. Legal Basis for Processing</h2>
              <p>We process your personal data on the following legal bases under UK GDPR:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Contract:</strong> Processing necessary to fulfil our services to you</li>
                <li><strong>Legitimate interests:</strong> For improving our services and preventing fraud</li>
                <li><strong>Legal obligation:</strong> Where we are required by law</li>
                <li><strong>Consent:</strong> For marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">5. Data Sharing</h2>
              <p>
                We do not sell your personal data. We may share your data with trusted third-party 
                service providers who assist us in operating our services (such as hosting providers, 
                email service providers), subject to strict data processing agreements. We will only 
                share your data as necessary and will never share it for their own marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">6. Data Retention</h2>
              <p>
                We retain your personal data for as long as necessary to provide our services and 
                comply with legal obligations. Application data is retained for the duration of your 
                subscription plus 2 years. You can request deletion of your data at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">7. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
                <li><strong>Rectification:</strong> Request we correct inaccurate data</li>
                <li><strong>Erasure:</strong> Request we delete your data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Restriction:</strong> Request we restrict processing of your data</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at hello@websitesforfree.co.uk.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">8. Cookies</h2>
              <p>
                We use cookies to improve your experience on our website. Please see our{" "}
                <a href="/cookies" className="text-indigo-600 hover:underline">Cookie Policy</a>{" "}
                for full details.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal 
                data against unauthorised access, loss, or destruction. However, no internet transmission 
                is ever completely secure. Please take care when sharing sensitive information online.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">10. Complaints</h2>
              <p>
                If you believe we have not handled your data correctly, you have the right to lodge a 
                complaint with the Information Commissioner&apos;s Office (ICO): ico.org.uk
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of significant 
                changes by posting a notice on our website or emailing you directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
