# Concepts — Early Access Static Pages

This folder contains five early-access static landing pages (email-capture only) for micro-tools.

Pages included
- `adsense-rpm/index.html`
- `breathwork-generator/index.html`
- `viral-hook-generator/index.html`
- `decision-style/index.html`
- `minimalist-checklist/index.html`

Quick local test
Run a simple static server from the `Concepts` folder and open http://localhost:8000:

```bash
cd "C:/Users/WIPED/Concepts"
python -m http.server 8000
```

Deploy options

1) GitHub Pages (recommended for quick free hosting)
   - Create a repo and push the `Concepts` folder as the repository root, or place these files in the `docs/` folder of a repo.
   - In repository Settings → Pages select the branch and root (`/` or `/docs`) and publish.

2) Netlify
   - Drag & drop the `Concepts` folder into Netlify Drop (quick) or connect your Git repo.
   - Set `publish directory` to the folder containing `index.html` (for root deploy use the repo root).
   - Deploy; Netlify will provide a URL.

3) Vercel
   - Connect your Git repo to Vercel and set the framework preset to "Other".
   - Ensure the project root contains the `Concepts` folder or deploy `Concepts` as the repo root.
   - Vercel will auto-deploy on push.

Form/email embed guidance
- Each page currently uses `action="YOUR_EMAIL_PROVIDER_WEBHOOK_OR_EMBED_URL"`. Replace this with your provider's form action or paste their embed code into the HTML.

Common providers
- Mailchimp: use the embedded form code from Audience → Signup forms, or use the form `action` URL from the embedded form.
- ConvertKit: use the form embed script or the form `action` URL from their form HTML.
- MailerLite: use the Embedded forms or the form `action` endpoint for basic HTML forms.
- Formspree: use your project endpoint as the form `action`, e.g. `https://formspree.io/f/mgowrolb`.
- Getform: use their provided `action` endpoint to receive submissions without a full ESP.
- Netlify Forms: keep a standard form but add `data-netlify="true"` to the `<form>` and deploy on Netlify; submissions will appear in Netlify dashboard.

Best practices
- Use a dedicated email list per tool so you can target follow-ups.
- Keep the welcome email short and include the promised download/link immediately.
- Replace placeholder copy and `action` before publicizing.

Next steps (suggested)
- Verify each form works by submitting your email locally or on a deploy preview.
- Add an index page linking the five tools (optional) for a simple landing hub.
- Track traffic with Google Analytics or Plausible once live.

If you want, I can:
- Add a root `index.html` linking all five pages.
- Replace the form placeholders with a specific provider embed (tell me which provider).

Cloudflare + custom domain (concepts.quantummerlin.com)

Recommended host: Cloudflare Pages (since you use Cloudflare). Quick steps:

1) Push this `Concepts` folder to `https://github.com/quantummerlin/Concepts` (root of repo).
2) In Cloudflare dashboard → Pages → Create a project and connect the GitHub repo. Build settings: choose "None" or static (no build) and set the output directory to `/`.
3) In Pages project settings, add `concepts.quantummerlin.com` as a custom domain.
4) In Cloudflare DNS, add a CNAME record for `concepts` pointing to the Pages domain (your-project.pages.dev). Cloudflare typically configures this automatically when you add the custom domain from Pages.
5) Ensure SSL is enabled in Cloudflare Pages (Pages issues certificates automatically). If you use GitHub Pages or Netlify instead, temporarily set the DNS record to "DNS only" (grey cloud) during verification so those hosts can provision certificates, then you may enable the proxy as needed.

If you prefer GitHub Pages / Netlify / Vercel instead, tell me and I’ll add specific DNS steps — for GitHub Pages I already added a `CNAME` file with the domain.

When you want me to push to GitHub, confirm and I will create a commit and push to `https://github.com/quantummerlin/Concepts` (I will need your permission to push or you can add me as a collaborator). After pushing I can guide the Cloudflare Pages connect step.
