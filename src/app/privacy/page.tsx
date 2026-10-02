import { site } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import Legal from "@/components/Legal";

export const metadata = pageMeta({ title: "Privacy Policy", description: "How Starting Point Capital collects and uses your information.", path: "/privacy" });

export default function Page() {
  return (
    <Legal title="Privacy policy" updated="October 1, 2026">
      <p>This draft policy describes how Starting Point Capital collects, uses, and protects information you share through this website.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Information you provide in forms, such as your name, email, phone number, accredited status, and messages.</li>
        <li>Basic usage data such as pages visited, referring links, and campaign parameters, collected with cookies and analytics tools.</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use your information to respond to you, share educational content, schedule calls, and tell you about investment opportunities you may qualify for. We store contact information in our customer relationship management system.</p>
      <h2>Text messages</h2>
      <p>If you agree to receive text messages, message frequency varies and message and data rates may apply. Reply STOP to opt out or HELP for help. We do not sell or share your mobile number or text messaging consent with third parties for their marketing purposes.</p>
      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers who help us operate, such as our CRM, scheduling, and investor portal providers, and with our operating partner when you choose to invest.</p>
      <h2>Your choices</h2>
      <p>You can unsubscribe from emails at any time, opt out of texts by replying STOP, or ask us to update or delete your information by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </Legal>
  );
}
