import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-[#001a4d] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Terms of Service</span>
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
                Welcome to Hama Nasi. These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">2. Use of Services</h2>
              <p className="mb-3">
                Our services are provided "as is" and "as available" for your use, without warranties of any kind, either express or implied.
              </p>
              <p className="mb-6">
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">3. Service Availability</h2>
              <p className="mb-6">
                We strive to provide our services 24/7, but we cannot guarantee that our services will be available at all times. We may experience hardware, software, or other problems, resulting in service interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify our services at any time without prior notice.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">4. Moving Services</h2>
              <p className="mb-3">
                Hama Nasi provides moving and relocation services. By booking our services, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2">Provide accurate information about the items to be moved</li>
                <li className="mb-2">Ensure all items are properly packed and ready for transport</li>
                <li className="mb-2">Be present or have a representative present at the pickup and delivery locations</li>
                <li className="mb-2">Pay the agreed-upon fees for services rendered</li>
                <li>Notify us of any special handling requirements or fragile items</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">5. Liability Limitations</h2>
              <p className="mb-6">
                While we take all reasonable precautions to ensure the safe transport of your belongings, Hama Nasi's liability is limited to the terms specified in our service agreement. We recommend that customers obtain appropriate insurance coverage for high-value items.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">6. Payment Terms</h2>
              <p className="mb-6">
                Payment for our services is due as specified in your service agreement. We accept various payment methods as indicated during the booking process. Late payments may result in additional fees or service interruptions.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">7. Cancellation Policy</h2>
              <p className="mb-6">
                Cancellations must be made at least 48 hours before the scheduled service. Cancellations made less than 48 hours in advance may be subject to a cancellation fee as outlined in your service agreement.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">8. Intellectual Property</h2>
              <p className="mb-6">
                The content on our website, including text, graphics, logos, and images, is the property of Hama Nasi and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute our content without our express written permission.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">9. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of the state of California, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in San Francisco, California.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">10. Changes to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on our website. Your continued use of our services after such modifications will constitute your acknowledgment of the modified Terms.
              </p>

              <h2 className="text-2xl font-bold text-[#001a4d] mb-4">11. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="mb-1"><strong>Hama Nasi</strong></p>
                <p className="mb-1">Karen</p>
                <p className="mb-1">Nairobi, Kenya</p>
                <p className="mb-1">Email: legal@hamanasi.com</p>
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