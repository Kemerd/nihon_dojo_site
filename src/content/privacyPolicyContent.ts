/**
 * Centralized Privacy Policy Content
 *
 * This file contains the complete privacy policy content for Nihon Dojo.
 * Edit this file to update the privacy policy across all platforms (website, app stores, etc.)
 */

export const PRIVACY_POLICY = {
  // Metadata
  effectiveDate: "October 1, 2025",
  companyName: "Novabox LLC",
  serviceName: "Nihon Dojo",
  supportEmail: "support@novabox.digital",

  // Introduction section (appears before numbered sections)
  introduction: `This Privacy Policy describes how Novabox LLC ("Novabox," "Company," "we," "us," or "our") collects, uses, processes, and discloses your information when you use our Nihon Dojo service (the "Service"). By using the Service, you consent to the data practices described in this Privacy Policy.`,

  // Main content sections with legal numbering
  sections: [
    {
      number: "1",
      title: "Information We Collect",
      subsections: [
        {
          number: "1.1",
          title: "Personal Information",
          content: `We may collect various types of personally identifiable information, including:`,
          list: [
            "Full name",
            "Email address",
            "Billing information and payment details",
            "Device information",
            "IP address and location data",
            "Usage data and analytics"
          ]
        },
        {
          number: "1.2",
          title: "Japanese Learning Data",
          content: `We collect data related to your Japanese language learning progress, including but not limited to:`,
          list: [
            "Vocabulary words studied and review history",
            "Grammar lessons completed",
            "Spaced repetition review statistics (FSRS algorithm data)",
            "Example sentences generated for your study sessions",
            "Formality level preferences (casual, normal, polite)",
            "Learning streak data and session timestamps",
            "Quiz and test results",
            "Study duration and frequency patterns",
            "Words marked as difficult or mastered",
            "Custom notes and annotations",
            "Kana practice performance data"
          ]
        },
        {
          number: "1.3",
          title: "Usage Information",
          content: `We collect information about how you use the Service, including:`,
          list: [
            "Features accessed",
            "Time spent using the Service",
            "Clicks, interactions, and navigation patterns",
            "Subscription tier and payment history",
            "Feature preferences",
            "Response to study recommendations",
            "Logs, device information, and error reports",
            "Behavioral analytics"
          ]
        },
        {
          number: "1.4",
          title: "Communication Data",
          content: `We may collect information when you communicate with us, including:`,
          list: [
            "Support requests",
            "Survey responses",
            "Feedback",
            "Social media interactions"
          ]
        },
        {
          number: "1.5",
          title: "Technical Data",
          content: `We automatically collect certain technical information, including:`,
          list: [
            "Browser type and version",
            "Operating system",
            "Hardware specifications",
            "Network information",
            "Crash reports and performance data",
            "System memory and CPU utilization"
          ]
        }
      ]
    },
    {
      number: "2",
      title: "How We Use Your Information",
      content: `We may use the information we collect for various purposes, including but not limited to:`,
      subsections: [
        {
          number: "2.1",
          title: "Providing and Improving the Service",
          list: [
            "Delivering the core functionality of Nihon Dojo",
            "Processing and responding to your requests",
            "Personalizing your learning experience",
            "Developing new features and improving existing ones",
            "Fixing bugs and enhancing performance",
            "Optimizing spaced repetition algorithms for your learning patterns"
          ]
        },
        {
          number: "2.2",
          title: "AI-Powered Sentence Generation",
          list: [
            "Generating example sentences using vocabulary you've already learned",
            "Customizing sentence complexity based on your current level",
            "Creating sentences with appropriate formality levels",
            "Training and improving our sentence generation models",
            "Analyzing learning patterns to optimize content delivery"
          ]
        },
        {
          number: "2.3",
          title: "Learning Analytics",
          list: [
            "Tracking your progress toward fluency goals",
            "Identifying areas where you need additional practice",
            "Calculating and enforcing the two-year fluency guarantee",
            "Creating personalized study recommendations",
            "Generating progress reports and statistics"
          ]
        },
        {
          number: "2.4",
          title: "Business Operations",
          list: [
            "Processing payments and managing subscriptions",
            "Authenticating users",
            "Communicating with users",
            "Analyzing usage patterns",
            "Enforcing our Terms of Service",
            "Protecting against fraud and abuse"
          ]
        },
        {
          number: "2.5",
          title: "Marketing and Communications",
          list: [
            "Sending service-related announcements",
            "Providing customer support",
            "Sending promotional communications (with opt-out available)",
            "Measuring marketing effectiveness"
          ]
        }
      ]
    },
    {
      number: "3",
      title: "How We Share Your Information",
      content: `We may share your information in the following circumstances:`,
      subsections: [
        {
          number: "3.1",
          title: "Service Providers",
          content: `We may share your information with third-party service providers who perform services on our behalf, such as:`,
          list: [
            "Payment processing (e.g., Stripe)",
            "AI sentence generation (e.g., OpenAI API)",
            "Email delivery",
            "Hosting services",
            "Customer service platforms",
            "Analytics providers"
          ]
        },
        {
          number: "3.2",
          title: "Business Transfers",
          content: `If Novabox is involved in a merger, acquisition, financing, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be sold or transferred as part of such a transaction.`
        },
        {
          number: "3.3",
          title: "Legal Requirements",
          content: `We may disclose your information where required to do so by law or subpoena or if we believe that such action is necessary to:`,
          list: [
            "Comply with a legal obligation",
            "Protect and defend the rights or property of Novabox",
            "Prevent or investigate possible wrongdoing in connection with the Service",
            "Protect the personal safety of users of the Service or the public",
            "Protect against legal liability"
          ]
        },
        {
          number: "3.4",
          title: "Aggregated or De-identified Data",
          content: `We may share aggregated or de-identified information, which cannot reasonably be used to identify you, with third parties for research, analytics, or marketing purposes.`
        }
      ]
    },
    {
      number: "4",
      title: "Data Retention",
      content: `We will retain your information for as long as your account is active, as necessary to provide you with the Service, or as otherwise necessary to fulfill the purposes outlined in this Privacy Policy.

We may retain and use your information as necessary to:`,
      list: [
        "Comply with our legal obligations",
        "Resolve disputes",
        "Enforce our agreements",
        "Calculate and verify the two-year fluency guarantee"
      ],
      additionalContent: `If you delete your account, we will delete or anonymize your personal information within a reasonable timeframe, except where we are required to retain it for legal purposes.`
    },
    {
      number: "5",
      title: "Data Storage and Transfer",
      content: `Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.

If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including Personal Information, to the United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`
    },
    {
      number: "6",
      title: "Your Data Rights",
      content: `Depending on your location, you may have certain rights regarding your personal information:`,
      subsections: [
        {
          number: "6.1",
          title: "Access and Portability",
          content: `You may have the right to request access to the personal information we hold about you and to receive your data in a portable format.`
        },
        {
          number: "6.2",
          title: "Correction",
          content: `You may have the right to request that we correct inaccurate or incomplete information about you.`
        },
        {
          number: "6.3",
          title: "Deletion",
          content: `You may have the right to request that we delete your personal information in certain circumstances, subject to legal retention requirements.`
        },
        {
          number: "6.4",
          title: "Restriction and Objection",
          content: `You may have the right to restrict or object to our processing of your personal information in certain circumstances.`
        },
        {
          number: "6.5",
          title: "Exercising Your Rights",
          content: `To exercise these rights, please contact us at support@novabox.digital. Please note that these rights are not absolute, and we may be entitled to refuse requests where exceptions apply.`
        }
      ]
    },
    {
      number: "7",
      title: "Opt-Out Provisions",
      subsections: [
        {
          number: "7.1",
          title: "Marketing Communications",
          content: `You can opt out of receiving marketing communications from us by clicking on the "unsubscribe" link in any email we send.`
        },
        {
          number: "7.2",
          title: "Service-Related Communications",
          content: `Some communications (such as service announcements, account notifications, and billing messages) are essential to the Service and cannot be opted out of while you maintain an active account.`
        },
        {
          number: "7.3",
          title: "Offline Usage",
          content: `The Service includes offline functionality that allows you to study without an internet connection. When using the app offline, no data is transmitted to our servers until you reconnect.`
        }
      ]
    },
    {
      number: "8",
      title: "Children's Privacy",
      content: `The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information. If you become aware that a child has provided us with personal information, please contact us.`
    },
    {
      number: "9",
      title: "Security",
      content: `We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`
    },
    {
      number: "10",
      title: "Changes to This Privacy Policy",
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this Privacy Policy. Your continued use of the Service after we post any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.`
    },
    {
      number: "11",
      title: "Third-Party Links and Services",
      content: `The Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`
    },
    {
      number: "12",
      title: "Analytics and Tracking",
      content: `We may use third-party analytics services to help us understand how users engage with the Service. These services collect information sent by your device or the Service, including the web pages you visit, features used, and other information that assists us in improving the Service.`
    },
    {
      number: "13",
      title: "California Privacy Rights",
      content: `If you are a California resident, you have specific rights regarding your personal information under the California Consumer Privacy Act (CCPA):`,
      list: [
        "Right to know what personal information we collect",
        "Right to request deletion of personal information",
        "Right to opt-out of the sale of personal information",
        "Right to non-discrimination for exercising your CCPA rights"
      ],
      additionalContent: `To exercise these rights, please contact us at support@novabox.digital.`
    },
    {
      number: "14",
      title: "International Users",
      content: `If you are accessing our Service from the European Union, United Kingdom, Switzerland, or any other region with laws or regulations governing personal data collection, use, and disclosure that differ from United States laws, please be advised that we process your data in the United States.

By using the Service, you consent to your personal information being transferred to and processed in the United States.`
    },
    {
      number: "15",
      title: "Data Processing Addendum",
      content: `If you are subject to the European General Data Protection Regulation (GDPR) and require a Data Processing Addendum (DPA), please contact us at support@novabox.digital.`
    },
    {
      number: "16",
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us:

By email: support@novabox.digital`
    }
  ]
};

// Helper type for type safety
export type PrivacyPolicySection = {
  title: string;
  content?: string;
  list?: string[];
  subsections?: PrivacyPolicySection[];
  additionalContent?: string;
  number?: string; // For legal document numbering (e.g., "1", "1.1", "2.3")
};
