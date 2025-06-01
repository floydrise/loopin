import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy_policy")({
  component: RouteComponent,
});

const privacyPolicyInfo = [
  {
    header: "1. Who We Are",
    list: undefined,
    para: "LoopIn is an event management app developed and operated in Bulgaria, Europe. You can contact us at floydrise@gmail.com.",
  },
  {
    header: "2. Information We Collect",
    list: [
      "Name, email, and profile picture from your social login provider (Google or GitHub)",
      "Access to add events to your Google Calendar (only if you log in with Google and grant permission)",
    ],
    para: "We only collect the data provided by your social login provider, and optionally, permission to add events to your Google Calendar if you log in with Google.",
  },
  {
    header: "3. How We Use Your Information",
    list: [
      "To authenticate your login",
      "To let you browse and subscribe to events",
      "To issue event subscription tickets",
      "To add events to your Google Calendar (if you grant permission)",
      "To send confirmation emails",
    ],
    para: "We use your data only for the core functionality of the app. We do not use it for analytics or advertising.",
  },
  {
    header: "4. Third-Party Services",
    list: [
      "Google APIs (for login and calendar integration)",
      "GitHub OAuth (for login)",
      "Stripe (for payment processing)",
      "Resend (for sending confirmation emails)",
    ],
    para: "We use third-party services solely to deliver the features of LoopIn. Your data is not sold or shared beyond these providers.",
  },
  {
    header: "5. Data Storage and Security",
    list: undefined,
    para: "Your data is stored securely in a PostgreSQL database hosted on Neon. We do not store payment details or passwords.",
  },
  {
    header: "6. Your Rights",
    list: [
      "Access your account data",
      "Delete your event subscriptions",
      "Delete your account at any time",
    ],
    para: "You are in control of your data. While you can’t edit your name or profile picture through LoopIn, you can delete your subscriptions or account whenever you like.",
  },
  {
    header: "7. Children’s Privacy",
    list: undefined,
    para: "LoopIn is not intended for use by children under 16. We do not knowingly collect data from children.",
  },
  {
    header: "8. International Data Transfers",
    list: undefined,
    para: "Your data is stored in the EU. If you use the app from outside the EU, your data may be processed in accordance with applicable laws.",
  },
  {
    header: "9. Changes to This Policy",
    list: undefined,
    para: "We may update this Privacy Policy from time to time. You’ll be notified in-app or via email if we make significant changes.",
  },
  {
    header: "10. Contact Us",
    list: undefined,
    para: "If you have questions or concerns about your privacy, please contact us at floydrise@gmail.com.",
  },
];

function RouteComponent() {
  return (
    <section className={"mt-30 mb-10 flex justify-center items-center"}>
      <div
        className={
          "max-w-4xl mx-2 border rounded-2xl p-4 bg-primary-foreground"
        }
      >
        <h1 className={"text-4xl font-bold"}>Privacy policy</h1>
        <p className={"font-light italic text-lg"}>
          <span className={"font-semibold"}>Effective Date:</span> May 30, 2025
        </p>
        <p className={"font-light text-muted-foreground text-sm mb-6"}>
          Welcome to LoopIn 👋🏻 Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal data
          when you use our app.
        </p>
        {privacyPolicyInfo.map((info, index) => (
          <div key={info.header + index}>
            <h1 className={"text-2xl font-semibold"}>{info.header}</h1>
            {info.list
              ? info.list.map((list, index) => (
                  <ul key={list + index} className={"list-disc ml-4"}>
                    <li>{list}</li>
                  </ul>
                ))
              : null}
            <p className={"mb-4"}>{info.para}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
