import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BreakdownShell } from "@/components/breakdown/BreakdownShell";
import { SignupForm } from "@/components/breakdown/SignupForm";
import { usePageMeta } from "@/hooks/use-page-meta";
import { readToken } from "@/lib/breakdown/api";

const VIA_RE = /^[a-z0-9_-]{1,40}$/i;

export default function BreakdownLanding() {
  usePageMeta({
    title: "Your ChatGPT, in numbers · Verso",
    description: "Connect your ChatGPT and get your personal breakdown: how much you chat, when, about what, and which sites ChatGPT cites to you.",
  });
  const [params] = useSearchParams();
  const via = useMemo(() => {
    const v = params.get("via")?.trim() ?? "";
    return VIA_RE.test(v) ? v.toLowerCase() : null;
  }, [params]);
  const existing = useMemo(() => readToken(), []);

  return (
    <BreakdownShell aside={existing ? <Link className="btn btn-ghost btn-sm" to="/breakdown/me">My breakdown</Link> : undefined}>
      <section className="bd-hero">
        <div className="eyebrow">A free tool by Verso</div>
        <h1 className="bd-h1">
          Your ChatGPT, <em>in numbers.</em>
        </h1>
        <p className="bd-lead">
          How much you really use it, at what hours, about what, and which sites it cites to you. Built from your full history, in a few minutes.
        </p>
      </section>

      <SignupForm via={via} />

      <section className="bd-section" aria-labelledby="get-h">
        <h2 id="get-h">What you get</h2>
        <ul className="bd-list">
          <li><span className="ico">→</span><span><b>Your numbers.</b> Conversations, messages, words typed, days active, streaks, your typical prompt.</span></li>
          <li><span className="ico">→</span><span><b>Where answers come from.</b> How often ChatGPT searches the web for you, the sites it cites or reads most, and the brands and products it recommends.</span></li>
          <li><span className="ico">→</span><span><b>What you use it for.</b> Every conversation filed under a topic and an intent: work vs personal, asking vs doing.</span></li>
          <li><span className="ico">→</span><span><b>Your rhythm.</b> By month, hour and weekday; the models that answered; images, voice and thinking time.</span></li>
        </ul>
      </section>

      <section className="bd-section" aria-labelledby="how-h">
        <h2 id="how-h">How it works</h2>
        <ol className="bd-steps">
          <li><span>Enter your email and accept the terms.</span></li>
          <li><span>Sign in to ChatGPT on OpenAI's own pages, in a secure window. Verso never sees your password.</span></li>
          <li><span>Your history imports in the background. The first numbers appear within minutes; we email you when everything is in.</span></li>
        </ol>
      </section>

      <section className="bd-section" aria-labelledby="faq-h">
        <h2 id="faq-h">The honest part</h2>
        <div className="bd-faq">
          <div>
            <h3>Why is it free?</h3>
            <p>Verso builds conversation datasets for researchers and companies studying how people use AI assistants. Your conversations join those datasets, de-identified: no name, no email, no account identifier. That is the deal, and it is written on the sign-up form.</p>
          </div>
          <div>
            <h3>What does Verso import?</h3>
            <p>Your conversations and their attachments, through a session that ChatGPT grants to Verso when you sign in. New conversations keep syncing until you disconnect or delete.</p>
          </div>
          <div>
            <h3>Can I delete it?</h3>
            <p>Yes, from your breakdown page, at any time, in one click. Conversations, attachments and the ChatGPT session are erased immediately and for good.</p>
          </div>
          <div>
            <h3>Does this work on a phone?</h3>
            <p>Yes. The ChatGPT sign-in opens in your browser and your breakdown is built for a phone screen.</p>
          </div>
        </div>
        <p className="bd-note" style={{ marginTop: 18 }}>
          Questions: <a href="mailto:hello@tryverso.ai">hello@tryverso.ai</a>. See the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms</Link>.
        </p>
      </section>
    </BreakdownShell>
  );
}
