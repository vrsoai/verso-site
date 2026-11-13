import type { Breakdown, StatusView, YouKey } from "@/lib/breakdown/api";
import {
  WEEKDAYS,
  WEEKDAYS_LONG,
  compact,
  dateLabel,
  durationLabel,
  fixed,
  formatInt,
  hourLabel,
  intentLabel,
  modelLabel,
  monthLabel,
  monthLong,
  monthsSpan,
  peakIndex,
  pct,
  percentileOf,
  ratio,
  topicLabel,
} from "@/lib/breakdown/format";
import { ColumnChart } from "./ColumnChart";
import { PercentileMeter } from "./PercentileMeter";
import { RankedBars } from "./RankedBars";
import { StatTile } from "./StatTile";

const MIN_PANEL = 25;
const TOP_DOMAINS = 10;
const TOP_NAMES = 10;
const TOP_MODELS = 8;

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="bd-section" id={id} aria-labelledby={`${id}-h`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 id={id + "-h"}>{title}</h2>
      {lead ? <p className="bd-lead">{lead}</p> : null}
      {children}
    </section>
  );
}

export function HeroNumbers({ b }: { b: Breakdown }) {
  const t = b.totals;
  const months = monthsSpan(t.firstAt, t.lastAt);
  const perWeek = t.firstAt && t.lastAt ? t.conversations / Math.max(1, (Date.parse(t.lastAt) - Date.parse(t.firstAt)) / 86_400_000 / 7) : null;
  return (
    <section className="bd-hero" aria-label="Your ChatGPT in numbers">
      <div className="bd-hero-figure">{formatInt(t.conversations)}</div>
      <div className="bd-hero-unit">
        conversations with ChatGPT since {dateLabel(t.firstAt)}
        {months > 1 ? `, about ${fixed(perWeek, perWeek != null && perWeek < 10 ? 1 : 0)} a week` : ""}.
      </div>
      <div className="bd-tiles">
        <StatTile value={compact(t.userMessages)} label="messages you sent" hint={`${compact(t.assistantMessages)} answers`} />
        <StatTile value={compact(t.userWords)} label="words you typed" hint={`ChatGPT wrote ${compact(t.assistantWords)}`} />
        <StatTile value={formatInt(t.daysActive)} label="days with at least one chat" hint={`longest streak ${formatInt(t.longestStreakDays)} days`} />
        <StatTile value={formatInt(t.medianPromptWords)} label="words in a typical prompt" hint="median" />
        <StatTile value={formatInt(t.medianUserMessagesPerConversation)} label="messages in a typical chat" hint={`${pct(ratio(t.singleMessageConversations, t.conversations))} are one-shot`} />
        <StatTile value={formatInt(t.longestConversationMessages)} label="messages in your longest chat" />
      </div>
    </section>
  );
}

export function SearchSection({ b }: { b: Breakdown }) {
  const s = b.search;
  const n = b.totals.conversations;
  const cited = s.topCitedDomains.slice(0, TOP_DOMAINS).map((d) => ({ label: d.domain, value: d.conversations, display: formatInt(d.conversations) }));
  const read = s.topReadDomains.slice(0, TOP_DOMAINS).map((d) => ({ label: d.domain, value: d.conversations, display: formatInt(d.conversations) }));
  const sampled = s.sampledConversations > 0 && s.sampledConversations < n;
  return (
    <Section
      id="search"
      eyebrow="Search & sources"
      title="Where your answers come from"
      lead={`ChatGPT searched the web in ${pct(ratio(s.conversationsWithSources, n))} of your conversations and cited ${fixed(s.sitesCitedPerAnswer)} sites per answer when it did.`}
    >
      <div className="bd-tiles" style={{ marginTop: 0 }}>
        <StatTile value={formatInt(s.conversationsWithSources)} label="conversations with web sources" hint={pct(ratio(s.conversationsWithSources, n)) + " of all"} />
        <StatTile value={formatInt(s.answersWithSources)} label="answers that cited a site" />
        <StatTile value={fixed(s.resultsReadPerAnswer)} label="results read per search" hint={`${fixed(s.sitesReadPerAnswer)} different sites`} />
        <StatTile value={formatInt(b.shopping.conversations)} label="shopping conversations" hint={pct(b.shopping.share) + " of all"} />
      </div>
      <div className="bd-two" style={{ marginTop: 12 }}>
        <div className="bd-card">
          <h3>Sites ChatGPT cited to you most</h3>
          <RankedBars items={cited} ariaLabel="Most cited sites" />
          <p className="bd-note">Conversations in which the site appears in a cited answer.</p>
        </div>
        <div className="bd-card">
          <h3>Sites it read but rarely cited</h3>
          <RankedBars items={read} ariaLabel="Most read sites" />
          <p className="bd-note">Pages ChatGPT opened while searching{sampled ? ` (from your ${formatInt(s.sampledConversations)} most recent conversations)` : ""}.</p>
        </div>
      </div>
    </Section>
  );
}

export function BrandsSection({ b, status }: { b: Breakdown; status: StatusView }) {
  if (!status.labels.enabled) return null;
  const br = b.brands ?? null;
  const n = b.totals.conversations;
  const assessed = br?.assessed ?? 0;
  const title = "Brands and products ChatGPT recommended to you";
  if (!br || assessed === 0) {
    return (
      <Section id="brands" eyebrow="Recommendations" title={title} lead="An AI model reads the answers of each conversation once and notes the brands, products, companies and organizations they put forward. This section fills in as the reading progresses.">
        <div className="bd-card">
          <p className="bd-muted">Reading your conversations…</p>
        </div>
      </Section>
    );
  }
  const partial = assessed < n;
  const top = br.topRecommended.slice(0, TOP_NAMES).map((d) => ({ label: d.name, value: d.conversations, display: formatInt(d.conversations) }));
  const mentioned = br.topMentioned.slice(0, TOP_NAMES).map((d) => ({ label: d.name, value: d.conversations, display: formatInt(d.conversations) }));
  return (
    <Section
      id="brands"
      eyebrow="Recommendations"
      title={title}
      lead={`ChatGPT recommended at least one brand, product, company or organization in ${pct(br.recommendedShare)} of your conversations, and two or more in ${pct(ratio(br.recommendedSeveral, assessed))}.`}
    >
      <div className="bd-tiles" style={{ marginTop: 0 }}>
        <StatTile value={formatInt(br.recommended)} label="conversations with a recommendation" hint={pct(br.recommendedShare) + (partial ? " of those read" : " of all")} />
        <StatTile value={formatInt(br.recommendedSeveral)} label="with two or more recommended" hint={pct(ratio(br.recommendedSeveral, assessed)) + (partial ? " of those read" : " of all")} />
        <StatTile value={formatInt(br.mentionedOnly)} label="named brands without recommending one" hint={pct(ratio(br.mentionedOnly, assessed)) + (partial ? " of those read" : " of all")} />
        <StatTile value={formatInt(br.distinctRecommended)} label="different names recommended" />
      </div>
      <div className="bd-two" style={{ marginTop: 12 }}>
        <div className="bd-card">
          <h3>Recommended to you most</h3>
          <RankedBars items={top} ariaLabel="Most recommended names" />
          <p className="bd-note">Conversations in which ChatGPT put the name forward: suggested it, listed it among options, ranked it or endorsed your choice.</p>
        </div>
        <div className="bd-card">
          <h3>Came up without a recommendation</h3>
          <RankedBars items={mentioned} ariaLabel="Names mentioned without a recommendation" />
          <p className="bd-note">Named in an answer in passing: your own tools or employer, background facts, examples.</p>
        </div>
      </div>
      {partial ? <p className="bd-note">Based on the {formatInt(assessed)} conversations read so far, out of {formatInt(n)}.</p> : null}
    </Section>
  );
}

export function LabelsSection({ b, status }: { b: Breakdown; status: StatusView }) {
  const l = b.labels;
  if (!status.labels.enabled) return null;
  const done = l.labeled > 0;
  const topics = l.topics.map((t) => ({ label: topicLabel(t.topic), value: t.conversations, display: pct(ratio(t.conversations, l.labeled)), hint: `${formatInt(t.conversations)} conversations` }));
  const intents = l.intents.map((t) => ({ label: intentLabel(t.intent), value: t.conversations, display: pct(ratio(t.conversations, l.labeled)), hint: `${formatInt(t.conversations)} conversations` }));
  const progress = status.labels.total > 0 ? `${formatInt(status.labels.labeled)} of ${formatInt(status.labels.total)} categorized` : "categorizing";
  return (
    <Section
      id="topics"
      eyebrow="What you use it for"
      title="Your conversations, by topic"
      lead={done ? `Each conversation was read once by an AI model and filed under one topic and one intent. ${pct(l.workShare)} of them are about work.` : "Each conversation is read once by an AI model and filed under one topic and one intent. This section fills in as categorization progresses."}
    >
      {done ? (
        <div className="bd-two">
          <div className="bd-card">
            <h3>Topics</h3>
            <RankedBars items={topics} ariaLabel="Topics" />
            <p className="bd-note">Share of the {formatInt(l.labeled)} categorized conversations{l.coverage != null && l.coverage < 0.98 ? ` (${pct(l.coverage)} of all so far)` : ""}.</p>
          </div>
          <div className="bd-card">
            <h3>What you were after</h3>
            <RankedBars items={intents} ariaLabel="Intents" />
            <p className="bd-note">Asking: information or advice. Doing: produce or fix something. Expressing: feelings, opinions, chit-chat.</p>
          </div>
        </div>
      ) : (
        <div className="bd-card">
          <p className="bd-muted">{progress}…</p>
        </div>
      )}
    </Section>
  );
}

export function RhythmSection({ b }: { b: Breakdown }) {
  const months = b.byMonth.map((m) => ({ key: m.month, tick: monthLabel(m.month, m.month.endsWith("-01")), label: monthLong(m.month), value: m.conversations }));
  const hours = b.byHour.map((v, h) => ({ key: String(h), tick: h % 6 === 0 ? hourLabel(h) : "", label: `${hourLabel(h)} – ${hourLabel(h + 1)}`, value: v }));
  const days = b.byWeekday.map((v, d) => ({ key: String(d), tick: WEEKDAYS[d], label: WEEKDAYS_LONG[d], value: v }));
  const peakMonth = peakIndex(b.byMonth.map((m) => m.conversations));
  const peakHour = peakIndex(b.byHour);
  const peakDay = peakIndex(b.byWeekday);
  const night = b.byHour.slice(0, 6).reduce((a, v) => a + v, 0);
  const total = b.byHour.reduce((a, v) => a + v, 0);
  const leadParts: string[] = [];
  if (peakMonth >= 0) leadParts.push(`Your busiest month was ${monthLong(b.byMonth[peakMonth].month)} (${formatInt(b.byMonth[peakMonth].conversations)} conversations)`);
  if (peakHour >= 0) leadParts.push(`you write most around ${hourLabel(peakHour)}`);
  if (peakDay >= 0) leadParts.push(`and on ${WEEKDAYS_LONG[peakDay]}s`);
  const lead = leadParts.length ? leadParts.join(", ") + `. ${pct(ratio(night, total))} of your messages are sent between midnight and 6 am (${b.timezone.replace(/_/g, " ")} time).` : undefined;
  return (
    <Section id="rhythm" eyebrow="When you chat" title="Your rhythm" lead={lead}>
      <div className="bd-card">
        <h3>Conversations per month</h3>
        <ColumnChart data={months} unit="conversations" tableTitle="Month" interval={months.length > 14 ? 2 : 0} />
      </div>
      <div className="bd-two" style={{ marginTop: 12 }}>
        <div className="bd-card">
          <h3>Messages by hour of the day</h3>
          <ColumnChart data={hours} unit="messages" tableTitle="Hour" interval={0} height={170} />
        </div>
        <div className="bd-card">
          <h3>Messages by day of the week</h3>
          <ColumnChart data={days} unit="messages" tableTitle="Day" interval={0} height={170} />
        </div>
      </div>
    </Section>
  );
}

export function ModelsSection({ b }: { b: Breakdown }) {
  const total = b.models.reduce((a, m) => a + m.messages, 0);
  if (total === 0) return null;
  const top = b.models.slice(0, TOP_MODELS);
  const rest = b.models.slice(TOP_MODELS).reduce((a, m) => a + m.messages, 0);
  const items = top.map((m) => ({ label: modelLabel(m.model), value: m.messages, display: pct(ratio(m.messages, total)), hint: `${formatInt(m.messages)} answers` }));
  if (rest > 0) items.push({ label: "Other models", value: rest, display: pct(ratio(rest, total)), hint: `${formatInt(rest)} answers` });
  return (
    <Section id="models" eyebrow="Models" title="Which ChatGPT answered you" lead={`Share of your ${formatInt(total)} answers, by the model that wrote them.`}>
      <div className="bd-card">
        <RankedBars items={items} ariaLabel="Models" />
        <p className="bd-note">"Unknown" is what ChatGPT reports for voice, older or system-routed answers.</p>
      </div>
    </Section>
  );
}

export function MediaSection({ b }: { b: Breakdown }) {
  const m = b.media;
  const th = b.thinking;
  const n = b.totals.conversations;
  const sampled = th.sampledConversations > 0 && th.sampledConversations < n;
  return (
    <Section id="media" eyebrow="Beyond text" title="Images, voice and thinking" lead={`ChatGPT spent ${durationLabel(th.totalSeconds)} thinking before answering you, across ${formatInt(th.answersWithReasoning)} answers.`}>
      <div className="bd-tiles" style={{ marginTop: 0 }}>
        <StatTile value={formatInt(m.imagesUploaded)} label="images you uploaded" hint={`in ${formatInt(m.conversationsWithImagesUploaded)} conversations`} />
        <StatTile value={formatInt(m.imagesGenerated)} label="images ChatGPT made for you" hint={`in ${formatInt(m.conversationsWithGeneratedImages)} conversations`} />
        <StatTile value={formatInt(m.voiceConversations)} label="voice conversations" />
        <StatTile value={durationLabel(th.longestSeconds)} label="longest single think" hint={`${formatInt(th.conversationsWithReasoning)} conversations with reasoning`} />
        <StatTile value={formatInt(b.gpts.conversations)} label="conversations with a custom GPT" hint={pct(b.gpts.share) + " of all"} />
      </div>
      {sampled ? <p className="bd-note">Thinking time and custom GPTs are measured on your {formatInt(th.sampledConversations)} most recent conversations.</p> : null}
    </Section>
  );
}

export function LongestSection({ b }: { b: Breakdown }) {
  if (b.longestConversations.length === 0) return null;
  return (
    <Section id="longest" eyebrow="Marathons" title="Your longest conversations">
      <div className="bd-card">
        <ol className="bd-longest">
          {b.longestConversations.map((c, i) => (
            <li key={i}>
              <span className="t" title={c.title}>{c.title || "Untitled"}</span>
              <span className="n">{formatInt(c.userMessages)} msgs · {dateLabel(c.startedAt)}</span>
            </li>
          ))}
        </ol>
        <p className="bd-note">Titles are the ones ChatGPT gave your conversations. Only you see them here.</p>
      </div>
    </Section>
  );
}

const YOU_METRICS: { key: YouKey; label: string; fmt: (v: number) => string }[] = [
  { key: "conversationsTotal", label: "Conversations", fmt: (v) => formatInt(v) },
  { key: "conversationsLast90Days", label: "Conversations in the last 90 days", fmt: (v) => formatInt(v) },
  { key: "userMessagesPerConversation", label: "Messages per conversation (average)", fmt: (v) => fixed(v, 1) },
  { key: "medianPromptWords", label: "Words in a typical prompt", fmt: (v) => formatInt(v) },
  { key: "searchShare", label: "Conversations with web sources", fmt: (v) => pct(v) },
  { key: "imagesShare", label: "Conversations with images", fmt: (v) => pct(v) },
];

export function PanelSection({ b }: { b: Breakdown }) {
  const panel = b.panel;
  if (!panel || !panel.metrics || (panel.connections ?? 0) < MIN_PANEL) return null;
  const rows = YOU_METRICS.map((m) => {
    const grid = panel.metrics?.[m.key] ?? null;
    const value = b.you[m.key];
    const p = percentileOf(value, grid);
    if (p == null || value == null || !grid) return null;
    return <PercentileMeter key={m.key} label={m.label} you={m.fmt(value)} percentile={p} median={m.fmt(grid.median)} />;
  }).filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <Section id="panel" eyebrow="You vs everyone" title="How you compare" lead={`Against the ${formatInt(panel.connections)} ChatGPT accounts in Verso's panel${panel.minConversations ? ` with at least ${formatInt(panel.minConversations)} conversations` : ""}.`}>
      <div className="bd-card">{rows}</div>
    </Section>
  );
}
