import { renderEmailShell } from "./base";

interface AccountWelcomeArgs {
  recipientName: string;
  verifyUrl: string;
}

export function accountWelcomeTemplate({ recipientName, verifyUrl }: AccountWelcomeArgs) {
  const body = `
    <p>Hi ${recipientName || "there"},</p>
    <p>
      Welcome to Trucksonflex! Your account is ready—just confirm your email address to start exploring our inventory
      and financing options tailored for your fleet.
    </p>
    <p style="margin: 28px 0;">
      <a
        href="${verifyUrl}"
        target="_blank"
        rel="noopener noreferrer"
        style="background:#0f766e;color:#ffffff;padding:14px 26px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block;"
      >
        Confirm my email
      </a>
    </p>
    <p style="color:#475569;">
      If you didn’t create this account, you can safely ignore this message. For support, reach us at
      <a href="mailto:support@trucksonflex.com">support@trucksonflex.com</a>.
    </p>
  `;

  return renderEmailShell({
    heading: "Welcome to Trucksonflex",
    preheader: "Confirm your email to start booking modern trucks in minutes.",
    body,
  });
}
