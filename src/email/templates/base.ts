export interface EmailShellOptions {
  heading: string;
  body: string;
  preheader?: string;
}

export function renderEmailShell({ heading, body, preheader }: EmailShellOptions) {
  const safePreheader = preheader ?? "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${heading}</title>
    <style>
      :root {
        color-scheme: light;
      }
      * {
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background: #f4f6f8;
        margin: 0;
        padding: 0;
        color: #0f172a;
      }
      .preheader {
        display: none !important;
        visibility: hidden;
        opacity: 0;
        color: transparent;
        height: 0;
        width: 0;
      }
      .wrapper {
        max-width: 620px;
        margin: 0 auto;
        padding: 32px 16px 48px;
      }
      .card {
        background: #ffffff;
        border-radius: 18px;
        padding: 40px 32px;
        box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08);
      }
      .brand {
        text-transform: uppercase;
        letter-spacing: 6px;
        color: #0f766e;
        font-weight: 600;
        font-size: 12px;
      }
      h1 {
        margin: 12px 0 24px;
        font-size: 30px;
        color: #0f172a;
      }
      p {
        line-height: 1.65;
        margin: 18px 0;
      }
      a {
        color: #0f766e;
        text-decoration: none;
        font-weight: 600;
      }
      .footer {
        text-align: center;
        margin-top: 32px;
        font-size: 12px;
        color: #64748b;
      }
      .footer a {
        color: #0f766e;
      }
    </style>
  </head>
  <body>
    <span class="preheader">${safePreheader}</span>
    <div class="wrapper">
      <div class="card">
        <span class="brand">Trucksonflex</span>
        <h1>${heading}</h1>
        ${body}
        <p style="margin-top: 36px;">— The Trucksonflex team</p>
      </div>
      <div class="footer">
        Need help? <a href="mailto:support@trucksonflex.com">support@trucksonflex.com</a>
      </div>
    </div>
  </body>
</html>`;
}
