export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8 text-primary">
        Privacy Policy
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
        <p>
          <strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
        </p>

        <p>
          Citizenship Bridge Inc. ("we," "us," or "our") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information
          when you visit our website [Your Website URL] (the "Site"), including any other media form,
          media channel, mobile website, or mobile application related or connected thereto.
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
          please do not access the site.
        </p>

        <h2 className="text-2xl font-semibold">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul>
          <li>
            <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address,
            and telephone number, and demographic information, such as your age, gender, hometown, and interests,
            that you voluntarily give to us when you register with the Site, participate in our chat feature,
            use the Citizenship Timer tool, or when you choose to participate in various activities related
            to the Site, such as online chat and message boards. You are under no obligation to provide us
            with personal information of any kind, however your refusal to do so may prevent you from using
            certain features of the Site.
          </li>
          <li>
            <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site,
            such as your IP address, your browser type, your operating system, your access times, and the pages
            you have viewed directly before and after accessing the Site.
          </li>
           <li>
            <strong>Chat Data:</strong> Questions you ask and conversations you have with our AI Digital Assistant may be
            logged for service improvement and analysis purposes. If you log in, this history may be associated with your account.
          </li>
          <li>
            <strong>Citizenship Timer Data:</strong> If you provide your name and email for an eligibility reminder, we will store this
            information solely for the purpose of sending you that reminder.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience.
          Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or eligibility reminders.</li>
          <li>Provide and improve the AI Digital Assistant functionality.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Respond to your requests and support needs.</li>
          <li>Protect against fraudulent transactions, theft, and protect against criminal activity.</li>
          {/* Add other relevant uses */}
        </ul>

        <h2 className="text-2xl font-semibold">Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>
        <ul>
          <li>
            <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary
            to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights,
            property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
          </li>
          <li>
            <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us
            or on our behalf, including data analysis, email delivery, hosting services, customer service, and marketing assistance.
            This includes the provider of the Large Language Model (LLM) API used by our Digital Assistant. These providers will only have access
            to the information necessary to perform their functions and are obligated to maintain the confidentiality and security of that information.
          </li>
          {/* Add other relevant disclosures */}
        </ul>
        <p>We do not sell your personal information.</p>


        <h2 className="text-2xl font-semibold">Security of Your Information</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information.
          While we have taken reasonable steps to secure the personal information you provide to us, please be aware
          that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission
          can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-semibold">Policy for Children</h2>
        <p>
          We do not knowingly solicit information from or market to children under the age of 13. If you become aware
          of any data we have collected from children under age 13, please contact us using the contact information provided below.
        </p>

        <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
          on the Site. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
          are effective when they are posted on this page.
        </p>

        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <p>
          Citizenship Bridge Inc.<br />
          [Your Contact Email Address]<br />
          [Your Physical Address, if applicable] <br />
          [Your Phone Number, if applicable]
        </p>
      </div>
    </div>
  );
}
