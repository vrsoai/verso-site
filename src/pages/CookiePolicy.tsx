import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

const CookiePolicy = () => {
  return (
    <>
      <Nav activeLink="legal" />
      <div className="legal-page">
        <div className="container">
          <article className="prose">
            <h1>Cookie Policy</h1>
            <p><small>Effective Date: February 15, 2026 &middot; Last Updated: February 15, 2026</small></p>

            <p>This Cookie Policy explains how Verso Solutions, Inc. ("Verso," "we," "us," or "our") uses cookies and similar technologies when you use our website, web application, and related services (collectively, the "Service"). This Policy should be read together with our <a href="/privacy">Privacy Policy</a>.</p>

            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device (computer, tablet, or mobile device) when you visit a website. Cookies help websites function properly and provide reporting and personalization features.</p>
            <p>Cookies may be first-party cookies (set by Verso) or third-party cookies (set by service providers or partners). We may also use similar technologies such as local storage, pixels, SDKs, and log files.</p>

            <h2>2. How We Use Cookies</h2>

            <h3>A. Strictly Necessary Cookies</h3>
            <p>These cookies are essential for the operation of our Service. They enable user authentication, account login sessions, security and fraud prevention, load balancing, and core functionality. These cookies cannot be disabled without affecting basic Service functionality.</p>

            <h3>B. Functional Cookies</h3>
            <p>These cookies allow us to remember your preferences, save settings, improve usability, and provide enhanced features.</p>

            <h3>C. Analytics Cookies</h3>
            <p>We use analytics tools to understand how users interact with our Service. These cookies help us measure traffic, analyze usage patterns, improve performance, and identify errors. Analytics data is generally aggregated and does not directly identify you.</p>

            <h3>D. Performance &amp; Diagnostic Technologies</h3>
            <p>We may collect information about feature usage, error reports, extension performance, and system diagnostics. This helps us improve reliability and product quality.</p>

            <h3>E. Marketing Cookies (If Applicable)</h3>
            <p>If we engage in marketing activities, we may use cookies to measure campaign effectiveness and deliver relevant communications.</p>

            <h2>3. Cookies and Our Chrome Extension</h2>
            <p>Our Chrome extension does not use traditional website cookies in the same way as web pages. However, it may use Chrome storage APIs, local storage, and session identifiers. These are used only to enable extension functionality, maintain authentication, and improve performance.</p>
            <p>The extension does not track browsing behavior beyond what is necessary to provide requested features. You may manage or remove the extension at any time via your browser settings.</p>

            <h2>4. Third-Party Cookies</h2>
            <p>We may allow third-party service providers to set cookies or use tracking technologies for analytics, infrastructure support, security, and payment processing. These providers process information under contractual obligations to protect data. Their use of information is governed by their respective privacy policies.</p>

            <h2>5. How to Control Cookies</h2>

            <h3>Browser Settings</h3>
            <p>Most browsers allow you to delete cookies, block cookies, and configure cookie preferences. Please note that disabling certain cookies may limit functionality.</p>

            <h3>Analytics Opt-Out</h3>
            <p>Some analytics providers offer opt-out mechanisms through their own websites.</p>

            <h3>EU/UK Users</h3>
            <p>If required by law, we provide a cookie consent mechanism allowing you to accept or reject non-essential cookies.</p>

            <h2>6. Data Retention</h2>
            <p>Cookies may persist for the duration of your session (session cookies) or for a defined period (persistent cookies). Retention periods vary depending on purpose and legal requirements.</p>

            <h2>7. Updates to This Cookie Policy</h2>
            <p>We may update this Cookie Policy periodically. If material changes occur, we will update the "Last Updated" date and provide notice where required by law.</p>

            <h2>8. Contact Us</h2>
            <p>If you have questions about this Cookie Policy or our data practices, please contact:</p>
            <p>Verso Solutions, Inc.<br />Email: <a href="mailto:contact@tryverso.ai">contact@tryverso.ai</a></p>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicy;
