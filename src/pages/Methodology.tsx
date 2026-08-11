import { Link } from "react-router-dom";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

const Methodology = () => {
  return (
    <>
      <Nav activeLink="methodology" />

      <section className="hero-methodology">
        <div className="container">
          <div className="eyebrow">Methodology</div>
          <h1>
            How the numbers <em>are made.</em>
          </h1>
          <p className="sub">
            The Verso Agent Index is built like an instrument: pinned versions, repeated runs,
            and every exclusion accounted for. This page is the full protocol. If a chart of ours
            can't be traced back to it, don't trust the chart.
          </p>
          <div className="meta">
            <span>
              LAST UPDATED &middot; <b>AUG 2026</b>
            </span>
            <span>
              CURRENT WAVE &middot; <b>WAVE 1</b>
            </span>
            <span>
              AGENTS &middot; <b>claude-code 2.1.220 &middot; codex 0.146.0</b>
            </span>
          </div>
          <div className="glance">
            <div className="gi">
              <div className="v num">2 profiles</div>
              <div className="l">Answer mode and build mode, never mixed.</div>
            </div>
            <div className="gi">
              <div className="v num">N = 12</div>
              <div className="l">Runs per prompt, per agent, per model.</div>
            </div>
            <div className="gi">
              <div className="v">pinned per wave</div>
              <div className="l">Agent versions frozen, auto-update disabled.</div>
            </div>
            <div className="gi">
              <div className="v">requested &ne; served</div>
              <div className="l">Serving model read from every transcript.</div>
            </div>
            <div className="gi">
              <div className="v">timeouts out</div>
              <div className="l">Truncated runs never enter aggregates.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="doc">
        <div className="narrow">
          {/* 01 */}
          <div className="sec">
            <div className="snum">01 &middot; WHAT WE MEASURE</div>
            <h2>Two profiles, two questions</h2>
            <p>
              Every prompt runs under two separate profiles. They answer different questions and
              are never aggregated together.
            </p>
            <div className="two">
              <div className="mode">
                <div className="k">Profile A</div>
                <h3>Answer mode</h3>
                <p>
                  The prompt is sent as a developer would type it, with the agent's default
                  configuration. We record which vendors the agent <b>recommends</b> in its
                  answer.
                </p>
                <span className="tag-badge">MENTION SHARE</span>
              </div>
              <div className="mode b">
                <div className="k">Profile B</div>
                <h3>Build mode</h3>
                <p>
                  The agent runs autonomously in a sandbox and implements the task. We record
                  which packages it <b>actually installs</b> while building.
                </p>
                <span className="tag-badge">INSTALL SHARE</span>
              </div>
            </div>
            <p>
              <b>Mention share</b> is the percentage of answer-mode runs in which a vendor is
              recommended. <b>Install share</b> is the percentage of build-mode runs (that
              needed the category) in which the vendor's package was installed. The gap between
              the two is usually the most interesting number we publish.
            </p>
          </div>

          {/* 02 */}
          <div className="sec">
            <div className="snum">02 &middot; PROMPTS</div>
            <h2>Real questions, not keyword lists</h2>
            <p>
              Prompts are written the way developers actually ask:{" "}
              <code>"add subscription billing to this Next.js app"</code>,{" "}
              <code>"set up semantic search over these documents"</code>. Each category is
              covered by a family of prompts varying stack, framing and constraint, so no single
              phrasing drives the result.
            </p>
            <p>
              Prompt sets are versioned. A wave's results always reference the exact prompt-set
              version that produced them, and prompt sets are frozen within a wave.
            </p>
          </div>

          {/* 03 */}
          <div className="sec">
            <div className="snum">03 &middot; ENVIRONMENT</div>
            <h2>Pinned, sandboxed, reproducible</h2>
            <ul>
              <li>
                Each run executes in a <b>fresh, isolated sandbox</b> with network access,
                matching a clean developer machine.
              </li>
              <li>
                Agent CLI versions are <b>pinned per wave</b> in the runtime image; auto-update
                is disabled. Upgrading an agent closes the wave and opens a new one.
              </li>
              <li>
                Build-mode autonomy instructions (the wrapper) are{" "}
                <b>versioned and hashed</b>; any change to their text opens a new wrapper
                version. The same wrapper is used for every agent.
              </li>
              <li>
                The captured CLI version is recorded{" "}
                <b>per run, from inside the sandbox</b>, not assumed from configuration.
              </li>
            </ul>
            <div className="callout">
              Agents interpret the same autonomy instructions differently: one may build a full
              system where another writes a design document. We do not equalize this with
              per-agent instructions. The differential interpretation is part of what we measure.
            </div>
          </div>

          {/* 04 */}
          <div className="sec">
            <div className="snum">04 &middot; MODELS</div>
            <h2>Requested is not served</h2>
            <p>
              Every batch declares its model explicitly; there are no implicit defaults in our
              configuration. For answer mode, the declared model is the{" "}
              <b>default model of the pinned CLI version</b>, verified empirically at wave start
              by running each agent with no model flag and reading what it serves. For build
              mode, the model is a deliberate, documented choice per wave.
            </p>
            <p>
              For every single run we record two fields: <code>requested_model</code> (what we
              asked for) and <code>served_model</code> (what the transcript shows actually
              answered). Silent substitutions happen: aliases resolve, and some models fall back
              to others on flagged requests. Runs where the two differ are flagged and{" "}
              <b>segmented out of aggregates</b>.
            </p>
            <p>
              A benchmark configuration is the triple{" "}
              <code>(cli_version, model, wrapper_version)</code>. Two different configurations
              are never compared inside the same metric.
            </p>
          </div>

          {/* 05 */}
          <div className="sec">
            <div className="snum">05 &middot; REPETITION</div>
            <h2>Distributions, not anecdotes</h2>
            <p>
              Agents are non-deterministic: one run is an anecdote. Every prompt runs{" "}
              <b>N = 12 times</b> per agent, per model, per profile. Published shares are
              computed over these distributions, and sample sizes are printed on every chart.
            </p>
            <table className="method-table">
              <thead>
                <tr>
                  <th>Reported number</th>
                  <th>Computed as</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Install share</td>
                  <td>
                    share of completed build-mode runs (needing the category) that installed the
                    package
                  </td>
                </tr>
                <tr>
                  <td>Mention share</td>
                  <td>share of completed answer-mode runs recommending the vendor</td>
                </tr>
                <tr>
                  <td>Trend</td>
                  <td>
                    same configuration compared wave over wave; configuration changes annotated
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 06 */}
          <div className="sec">
            <div className="snum">06 &middot; EXCLUSIONS</div>
            <h2>What never enters the numbers</h2>
            <ul>
              <li>
                <b>Timed-out runs</b> are excluded from all aggregates. A truncated measurement
                labeled as complete is a lie.
              </li>
              <li>
                <b>Model-mismatch runs</b> (served &ne; requested) are excluded from the main
                aggregates and reported separately.
              </li>
              <li>
                <b>Internal test runs</b> are flagged at the account level and excluded from
                everything.
              </li>
            </ul>
            <p>
              The exclusion rate itself is tracked per wave and per profile as a quality gauge,
              and reported alongside results. If exclusions rise, we say so and explain why.
            </p>
          </div>

          {/* 07 */}
          <div className="sec">
            <div className="snum">07 &middot; DETECTION</div>
            <h2>How installs and mentions are read</h2>
            <p>
              <b>Installs</b> are detected from the run's full transcript and workspace:
              package-manager invocations (<code>npm install</code>, <code>pip install</code>{" "}
              and equivalents) and the resulting dependency manifests. <b>Mentions</b> are
              extracted from answer-mode responses by vendor and product name, including SDK
              package names.
            </p>
            <p>
              Detection rules are versioned with the wave. When a rule changes (a new SDK name,
              a renamed package), affected historical numbers are recomputed or annotated, never
              silently mixed.
            </p>
          </div>

          {/* 08 */}
          <div className="sec">
            <div className="snum">08 &middot; VALIDATION</div>
            <h2>Checked against reality</h2>
            <p>
              Each profile is validated by comparison with manual runs on a real developer
              machine: the same prompt, typed by a human into the same agent version,
              interactively. If the sandbox and the desk disagree in kind, the profile is
              recalibrated before anything is published.
            </p>
            <div className="callout lm">
              Every published chart carries its source line: wave, sample size, pinned agent
              versions, and date. No source line, not our chart.
            </div>
          </div>

          {/* 09 */}
          <div className="sec">
            <div className="snum">09 &middot; LIMITATIONS</div>
            <h2>What this doesn't claim</h2>
            <p>
              Our prompt families are representative, not exhaustive; a vendor strong on prompts
              we don't run may be underrepresented. Sandboxes model a clean machine, not every
              machine. Agents and models evolve weekly, which is precisely why results are pinned
              to waves and never presented as timeless. Wave 1 figures shown on this prototype
              are <b>sample data</b> and marked as such until the first production wave ships.
            </p>
          </div>
        </div>
      </div>

      <div className="cta-methodology">
        <div className="container">
          <h2>
            Now read the <em>numbers.</em>
          </h2>
          <p>
            Two free figures from the live wave: your install share, and the competitor agents
            prefer.
          </p>
          <Link className="btn btn-lime" to="/#cta">
            Get my two numbers
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Methodology;
