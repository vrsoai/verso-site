import { Link } from "react-router-dom";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

const Developers = () => {
  return (
    <>
      <Nav activeLink="developers" />

      {/* ---- HERO ---- */}
      <section className="hero-developers">
        <div className="container">
          <div className="eyebrow">For developers</div>
          <h1>
            Connect to your users' <em>AI&nbsp;conversations.</em>
          </h1>
          <p className="sub">
            One integration to import, sync, and manage ChatGPT data.
            GDPR&#8209;ready, envelope&#8209;encrypted, real&#8209;time webhooks.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-blue" href="https://docs.tryverso.ai" target="_blank" rel="noopener noreferrer">
              Read the docs
            </a>
            <a className="btn btn-ghost" href="mailto:hello@tryverso.ai">
              Get API access
            </a>
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="dev-features">
        <div className="container">
          <div className="eyebrow">Platform</div>
          <h2>
            Everything you need to <em>ship.</em>
          </h2>
          <div className="steps four">
            <div className="step">
              <div className="num">01</div>
              <h3>Data import</h3>
              <p>
                Hosted connect page or server&#8209;side export ingestion.
                Your user logs into ChatGPT once, we handle the rest.
              </p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Incremental sync</h3>
              <p>
                Daily background pulls via headless browser. Cursor&#8209;based
                pagination, time&#8209;budgeted, automatic token rotation.
              </p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>GDPR deletion</h3>
              <p>
                One&#8209;click user purge or server&#8209;to&#8209;server API.
                Vault keys destroyed — credentials mathematically irrecoverable.
              </p>
            </div>
            <div className="step">
              <div className="num">04</div>
              <h3>Webhooks</h3>
              <p>
                Six event types, Stripe&#8209;style HMAC&#8209;SHA256 signatures,
                exponential backoff, max&nbsp;6&nbsp;retries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CODE SNIPPET ---- */}
      <section className="dark-section">
        <div className="container split">
          <div>
            <div className="eyebrow">Quick start</div>
            <h2>
              Three lines to a <em>connect&nbsp;link.</em>
            </h2>
            <p className="lead">
              Sign a short&#8209;lived JWT, redirect your user, and listen for
              the <span className="mono" style={{ color: "#F2EFE7" }}>connection.created</span> webhook.
              That's it.
            </p>
          </div>
          <div className="term">
            <div className="win-bar">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="win-title">server.ts</span>
            </div>
            <div className="term-body">
              <span className="ln"><span className="kw">import</span> {"{"} signLink {"}"} <span className="kw">from</span> <span className="str">"@verso/core"</span>;</span>
              <span className="ln">&nbsp;</span>
              <span className="ln"><span className="kw">const</span> {"{"} url {"}"} = <span className="kw">await</span> <span className="fn">signLink</span>({"{"}</span>
              <span className="ln">  <span className="prop">appId</span>:   <span className="str">"app_yourapp"</span>,</span>
              <span className="ln">  <span className="prop">userRef</span>: user.id,</span>
              <span className="ln">  <span className="prop">scopes</span>:  [<span className="str">"conversations:read"</span>],</span>
              <span className="ln">  <span className="prop">purpose</span>: <span className="str">"connect"</span>,</span>
              <span className="ln">{"}"}, process.env.<span className="prop">VERSO_SECRET</span>);</span>
              <span className="ln">&nbsp;</span>
              <span className="ln cm">{"// Redirect user to `url` — done."}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <div className="doc">
        <div className="narrow">
          {/* 01 */}
          <div className="sec">
            <div className="snum">01 &middot; CONNECT FLOW</div>
            <h2>From link to data in one redirect</h2>
            <p>
              Your backend signs a JWT with <b>signLink()</b> and redirects the user to
              the Verso connect page. The user logs into ChatGPT inside a secure Browserbase
              session. Once authenticated, conversations are imported automatically and a{" "}
              <code>connection.created</code> webhook fires back to your server.
            </p>
            <ul>
              <li>
                <b>Hosted connect</b> — zero frontend work. Generate a link, redirect, receive a webhook.
              </li>
              <li>
                <b>Export ingestion</b> — accept a ChatGPT export file via <code>POST /api/ingest-export</code>.
              </li>
              <li>
                <b>Daily sync</b> — background pull&#8209;worker refreshes conversations every 24h.
              </li>
            </ul>
          </div>

          {/* 02 */}
          <div className="sec">
            <div className="snum">02 &middot; DATA MODEL</div>
            <h2>Multi&#8209;tenant by design</h2>
            <p>
              Every partner app gets isolated data via Postgres Row Level Security.
              The entity hierarchy is simple:
            </p>
            <div className="callout">
              <b>App</b> → <b>User</b> (unique per app + user_ref) → <b>Connection</b> (active
              / needs_reauth / revoked) → <b>Conversation</b> (external_id unique per connection)
            </div>
            <p>
              Read conversations via <code>GET /api/conversations</code> with your API key.
              Paginated, rate&#8209;limited at 60&nbsp;req/min.
            </p>
          </div>

          {/* 03 */}
          <div className="sec">
            <div className="snum">03 &middot; SECURITY</div>
            <h2>Encrypted at rest, destroyed on demand</h2>
            <ul>
              <li>
                <b>Envelope encryption</b> — each connection's credentials are AES&#8209;256 encrypted
                with a per&#8209;connection key stored in a separate table.
              </li>
              <li>
                <b>Vault destruction</b> — on deletion, keys are destroyed. Credentials become
                mathematically irrecoverable, even for us.
              </li>
              <li>
                <b>Short&#8209;lived JWTs</b> — connect links expire in 15&nbsp;minutes. JTI replay
                protection ensures each link is single&#8209;use.
              </li>
              <li>
                <b>Signed webhooks</b> — every delivery carries a Stripe&#8209;style{" "}
                <code>t=&lt;ts&gt;,v1=&lt;hmac&gt;</code> signature you verify server&#8209;side.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- CTA ---- */}
      <div className="cta-developers">
        <div className="container">
          <h2>
            Start <em>building.</em>
          </h2>
          <p>
            Read the quickstart guide and ship your first integration.
          </p>
          <a className="btn btn-lime" href="https://docs.tryverso.ai/quickstart" target="_blank" rel="noopener noreferrer">
            Read the quickstart
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Developers;
