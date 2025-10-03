/**
 * Centralized Terms of Service Content
 *
 * This file contains the complete terms of service content for Nihon Dojo.
 * Edit this file to update the terms of service across all platforms (website, app stores, etc.)
 */

export const TERMS_OF_SERVICE = {
  // Metadata
  effectiveDate: "October 1, 2025",
  companyName: "Novabox LLC",
  serviceName: "Nihon Dojo",
  supportEmail: "support@novabox.digital",

  // Introduction section (appears before numbered sections)
  introduction: `These Terms of Service (the "Terms") constitute a legally binding agreement between you (the "User," "you," or "your") and Novabox LLC ("Novabox," "Company," "we," "us," or "our"), the owner and operator of Nihon Dojo (the "Service"). By accessing or using the Service in any way, including installing, downloading, or merely browsing the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the Service.`,

  // Main content sections with legal numbering
  sections: [
    {
      number: "1",
      title: "Agreement to Terms",
      content: `These Terms of Service (the "Terms") constitute a legally binding agreement between you (the "User," "you," or "your") and Novabox LLC ("Novabox," "Company," "we," "us," or "our"), the owner and operator of Nihon Dojo (the "Service"). By accessing or using the Service in any way, including installing, downloading, or merely browsing the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the Service.`
    },
    {
      number: "2",
      title: "Modifications to Terms",
      content: `We reserve the right, at our sole discretion, to modify these Terms at any time. We will notify users of material changes via email or through the Service. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree with the revised Terms, your only recourse is to discontinue using the Service.`
    },
    {
      number: "3",
      title: "Service Description",
      content: `Nihon Dojo is a Japanese language learning application that provides:`,
      list: [
        "FSRS-based spaced repetition for vocabulary and grammar",
        "AI-powered example sentence generation using your learned vocabulary",
        "Formality switching between casual, normal, and polite Japanese",
        "Structured grammar lessons",
        "Cultural context and practical usage guidance",
        "Kana practice tools",
        "Offline study capabilities"
      ],
      additionalContent: `The Service uses AI to generate personalized learning content based on your current knowledge level.`
    },
    {
      number: "4",
      title: "Eligibility and Account Registration",
      content: `To use the Service, you must:`,
      list: [
        "Be at least 18 years old",
        "Create an account with accurate and complete information",
        "Secure your account credentials",
        "Not share your account with others",
        "Be legally permitted to enter into these Terms"
      ],
      additionalContent: `We reserve the right to terminate your account at any time for violation of these Terms.`
    },
    {
      number: "5",
      title: "Subscription Plans and Payments",
      subsections: [
        {
          number: "5.1",
          title: "Subscription Plans",
          content: `We offer various subscription plans with different features and limitations. The Service is free to use with limited features. Premium features (such as AI-powered sentence generation) require a paid subscription.`
        },
        {
          number: "5.2",
          title: "Free Tier",
          content: `The free tier of Nihon Dojo allows you to:`,
          list: [
            "Use the app offline",
            "Access core vocabulary and grammar content",
            "Use FSRS spaced repetition",
            "Practice kana"
          ],
          additionalContent: `AI-powered sentence generation and certain premium features require a subscription.`
        },
        {
          number: "5.3",
          title: "Automatic Renewal",
          content: `All paid subscriptions automatically renew until canceled. By subscribing, you authorize us to charge your payment method for the subscription fee at the beginning of each billing period.`
        },
        {
          number: "5.4",
          title: "Cancellation",
          content: `You may cancel your subscription at any time through your account settings. Upon cancellation, you will retain access to premium features until the end of your current billing period. No refunds will be issued for partial subscription periods.`
        },
        {
          number: "5.5",
          title: "Refund Policy",
          content: `All payments are generally non-refundable. However, we will issue full refunds in the following cases:`,
          list: [
            "Technical issues that prevent you from using core features of the Service",
            "Billing errors or duplicate charges",
            "Dissatisfaction within the first 14 days of your initial subscription"
          ]
        },
        {
          number: "5.6",
          title: "Two-Year Fluency Guarantee",
          content: `If you use Nihon Dojo for at least 600 days out of 730 days (two years), complete all assigned reviews, and follow the study system as intended, but do not achieve conversational fluency in Japanese, we will refund your entire subscription cost for those two years.

To qualify for the guarantee:`,
          list: [
            "You must complete daily reviews on at least 600 out of 730 days",
            "You must complete at least 80% of recommended grammar lessons",
            "You must maintain an average review accuracy of at least 60%",
            "You must provide proof of attempted conversational assessment within 60 days after completing the 730-day period"
          ],
          additionalContent: `Conversational fluency is defined as the ability to hold a 10-minute conversation in Japanese on everyday topics with a native speaker, as verified by a third-party assessment we provide.`
        },
        {
          number: "5.7",
          title: "Price Changes",
          content: `We may change subscription prices at any time. Price changes will take effect at the next billing cycle. We will notify you at least 30 days before any price increase.`
        },
        {
          number: "5.8",
          title: "Token Costs",
          content: `AI-powered sentence generation incurs costs from third-party AI services. These costs are covered by your subscription. We cannot refund subscription fees for AI tokens already consumed.`
        }
      ]
    },
    {
      number: "6",
      title: "License and Ownership",
      subsections: [
        {
          number: "6.1",
          title: "Limited License to Use the Service",
          content: `Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal language learning purposes.`
        },
        {
          number: "6.2",
          title: "Ownership",
          content: `Novabox owns all right, title, and interest in the Service, including all intellectual property rights. Nothing in these Terms grants you any right, title, or interest in the Service except for the limited license expressly set forth above.`
        },
        {
          number: "6.3",
          title: "Feedback",
          content: `Any feedback, suggestions, or ideas you provide regarding the Service may be used by us without any compensation or obligation to you.`
        }
      ]
    },
    {
      number: "7",
      title: "User Content and Data Rights",
      subsections: [
        {
          number: "7.1",
          title: "User Content",
          content: `"User Content" includes any notes, annotations, custom study materials, or other content you create within the Service.`
        },
        {
          number: "7.2",
          title: "Ownership of User Content",
          content: `You retain ownership of your User Content. However, by using the Service, you grant Novabox a limited, worldwide, royalty-free license to use your User Content solely for the purpose of:`,
          list: [
            "Providing and improving the Service",
            "Generating personalized study materials",
            "Backing up and syncing your data across devices"
          ]
        },
        {
          number: "7.3",
          title: "Learning Data",
          content: `Your learning progress data (vocabulary studied, review history, quiz results) is used to:`,
          list: [
            "Personalize your learning experience",
            "Generate appropriate study materials",
            "Calculate your progress toward fluency",
            "Improve the Service for all users (in aggregated, anonymized form)"
          ]
        },
        {
          number: "7.4",
          title: "Data Privacy",
          content: `We take your privacy seriously. Please review our Privacy Policy for detailed information on how we collect, use, and protect your data.`
        },
        {
          number: "7.5",
          title: "Data Export",
          content: `You may export your learning data at any time through your account settings. We will provide your data in a standard format (JSON or CSV).`
        }
      ]
    },
    {
      number: "8",
      title: "User Conduct and Prohibited Activities",
      content: `You agree not to:`,
      list: [
        "Violate any laws or regulations",
        "Share your account credentials with others",
        "Use the Service to create a competing product",
        "Attempt to reverse engineer the Service",
        "Abuse, harass, or harm other users",
        "Interfere with the operation of the Service",
        "Attempt to gain unauthorized access to the Service",
        "Use automated systems (bots) to access the Service",
        "Resell or redistribute Service content without permission",
        "Use the Service for any illegal purpose"
      ]
    },
    {
      number: "9",
      title: "Third-Party Services and Content",
      content: `The Service may integrate with third-party services (such as payment processors and AI providers). We are not responsible for any third-party services or content, and your use of third-party services is subject to their terms of service.

The Service uses OpenAI's API for sentence generation. By using AI-powered features, you acknowledge and agree to OpenAI's terms and usage policies.`
    },
    {
      number: "10",
      title: "Disclaimer of Warranties",
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

NOVABOX DOES NOT WARRANT THAT:`,
      list: [
        "The Service will function uninterrupted or error-free",
        "All errors or defects will be corrected",
        "The Service will meet your specific learning goals (except as expressly stated in the Two-Year Fluency Guarantee)",
        "The Service will be available at any particular time or location",
        "AI-generated content will always be accurate or appropriate"
      ],
      additionalContent: `You acknowledge that language learning results vary by individual, and we make no guarantees except as explicitly stated in the Two-Year Fluency Guarantee.`
    },
    {
      number: "11",
      title: "Limitation of Liability",
      content: `IN NO EVENT SHALL NOVABOX BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.

NOVABOX'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO NOVABOX DURING THE SIX (6) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR $100, WHICHEVER IS GREATER.`
    },
    {
      number: "12",
      title: "Indemnification",
      content: `You agree to defend, indemnify, and hold harmless Novabox and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:`,
      list: [
        "Your use of and access to the Service",
        "Your violation of any term of these Terms",
        "Your violation of any third-party right, including without limitation any copyright, property, or privacy right",
        "Any claim that your User Content caused damage to a third party"
      ]
    },
    {
      number: "13",
      title: "Governing Law and Dispute Resolution",
      subsections: [
        {
          number: "13.1",
          title: "Governing Law",
          content: `These Terms shall be governed by the laws of the State of Delaware, without regard to its conflict of law provisions.`
        },
        {
          number: "13.2",
          title: "Informal Dispute Resolution",
          content: `Before filing a claim, you agree to try to resolve the dispute informally by contacting us at support@novabox.digital. We will attempt to resolve the dispute informally within 60 days.`
        },
        {
          number: "13.3",
          title: "Binding Arbitration",
          content: `If we cannot resolve a dispute informally, any dispute arising from or relating to these Terms or the Service shall be finally settled by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration will be conducted in the English language by a single arbitrator in Delaware.`
        },
        {
          number: "13.4",
          title: "Class Action Waiver",
          content: `YOU AGREE THAT ANY CLAIMS SUBJECT TO ARBITRATION UNDER THIS SECTION MUST BE BROUGHT IN YOUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.`
        },
        {
          number: "13.5",
          title: "Exceptions",
          content: `Notwithstanding the foregoing, either party may:`,
          list: [
            "Bring an individual action in small claims court",
            "Seek injunctive relief in a court of law to protect intellectual property rights",
            "Report violations to applicable government authorities"
          ]
        }
      ]
    },
    {
      number: "14",
      title: "Termination",
      subsections: [
        {
          number: "14.1",
          title: "Termination by Novabox",
          content: `We may terminate or suspend your account and access to the Service immediately, without prior notice, if you breach these Terms or engage in prohibited activities.`
        },
        {
          number: "14.2",
          title: "Termination by You",
          content: `You may terminate your account at any time by:`,
          list: [
            "Canceling your subscription (if applicable)",
            "Deleting your account through account settings",
            "Contacting us at support@novabox.digital"
          ]
        },
        {
          number: "14.3",
          title: "Effect of Termination",
          content: `Upon termination:`,
          list: [
            "Your right to use the Service will immediately cease",
            "You will lose access to your account and learning data (unless you export it first)",
            "Any outstanding payment obligations remain due",
            "Provisions related to ownership, warranties, indemnification, and dispute resolution survive termination"
          ],
          additionalContent: `We will retain your data for a reasonable period after termination in case you wish to reactivate your account.`
        }
      ]
    },
    {
      number: "15",
      title: "General Provisions",
      subsections: [
        {
          number: "15.1",
          title: "Entire Agreement",
          content: `These Terms, together with our Privacy Policy, constitute the entire agreement between you and Novabox regarding the Service and supersede any prior agreements.`
        },
        {
          number: "15.2",
          title: "Severability",
          content: `If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.`
        },
        {
          number: "15.3",
          title: "No Waiver",
          content: `Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision.`
        },
        {
          number: "15.4",
          title: "Assignment",
          content: `You may not assign or transfer these Terms without our prior written consent, but we may assign or transfer these Terms without restriction.`
        },
        {
          number: "15.5",
          title: "Force Majeure",
          content: `We shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of third-party services (such as AI providers).`
        },
        {
          number: "15.6",
          title: "Language",
          content: `These Terms are written in English. Any translations are provided for convenience only. In case of conflict between the English version and a translation, the English version prevails.`
        },
        {
          number: "15.7",
          title: "Contact Information",
          content: `For any questions about these Terms, please contact us at:

Novabox LLC
Email: support@novabox.digital`
        }
      ]
    },
    {
      number: "16",
      title: "Acknowledgment",
      content: `By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that you have read and understood our Privacy Policy.

If you are using Nihon Dojo for the purpose of achieving conversational fluency in Japanese and plan to take advantage of the Two-Year Fluency Guarantee, we encourage you to carefully review the requirements in Section 5.6.`
    }
  ]
};

// Helper type for type safety
export type TermsOfServiceSection = {
  title: string;
  content?: string;
  list?: string[];
  subsections?: TermsOfServiceSection[];
  additionalContent?: string;
  number?: string; // For legal document numbering (e.g., "1", "1.1", "2.3")
};
