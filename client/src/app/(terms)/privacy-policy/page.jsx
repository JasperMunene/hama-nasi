import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-[#001a4d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">1. Introduction</h2>
              <p className="mb-6">
                At Hama Nasi, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our moving and relocation services.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">2. Information We Collect</h2>
              <p className="mb-3">
                We collect several types of information from and about users of our website and services, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  <strong>Personal Information:</strong> Name, email address, postal address, phone number, and other contact details you provide when requesting our services or creating an account.
                </li>
                <li className="mb-2">
                  <strong>Service Information:</strong> Details about your moving needs, including origin and destination addresses, inventory of items, preferred moving dates, and special requirements.
                </li>
                <li className="mb-2">
                  <strong>Payment Information:</strong> Credit card details, billing address, and other financial information necessary to process payments.
                </li>
                <li className="mb-2">
                  <strong>Usage Data:</strong> Information about how you use our website, including your browsing actions, search queries, and viewing preferences.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and device information.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Providing and managing our moving and relocation services</li>
                <li className="mb-2">Processing payments and billing</li>
                <li className="mb-2">Communicating with you about your service requests, quotes, and appointments</li>
                <li className="mb-2">Sending promotional materials and newsletters (if you've opted in)</li>
                <li className="mb-2">Improving our website and services</li>
                <li className="mb-2">Conducting market research and analysis</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">4. Information Sharing</h2>
              <p className="mb-3">
                We may share your personal information with:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">
                  <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing, data analysis, and customer service.
                </li>
                <li className="mb-2">
                  <strong>Business Partners:</strong> Trusted partners who help us provide our services, such as local moving crews or storage facilities.
                </li>
                <li className="mb-2">
                  <strong>Legal Authorities:</strong> When required by law, court order, or governmental regulation.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as a business asset.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">5. Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">6. Your Privacy Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">The right to access your personal information</li>
                <li className="mb-2">The right to correct inaccurate or incomplete information</li>
                <li className="mb-2">The right to request deletion of your personal information</li>
                <li className="mb-2">The right to restrict or object to processing of your information</li>
                <li className="mb-2">The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="mb-6">
                We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. You can set your browser to refuse all or some browser cookies, but this may affect your ability to access certain features of our website.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">8. Children's Privacy</h2>
              <p className="mb-6">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">9. Changes to This Privacy Policy</h2>
              <p className="mb-6">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">10. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="mb-1"><strong>Hama Nasi</strong></p>
                <p className="mb-1">Karen</p>
                <p className="mb-1">Nairobi Kenya</p>
                <p className="mb-1">Email: privacy@hamanasi.com</p>
                <p>Phone: +254 7123 456 789</p>
              </div>

              <p className="text-sm text-gray-500">
              Last updated: March 7, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}