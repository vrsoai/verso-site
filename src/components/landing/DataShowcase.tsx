export const DataShowcase = () => {
  return (
    <section id="data">
      <div className="container split">
        <div>
          <div className="eyebrow">The data</div>
          <h2>
            Human-AI interactions, <em>structured and ready.</em>
          </h2>
          <p className="lead">
            Every conversation is normalized into a consistent schema — roles,
            content, timestamps, and metadata. Ready for training, fine-tuning,
            or analytics.
          </p>
          <div className="format-tags">
            <span className="format-tag">JSON</span>
            <span className="format-tag">Parquet</span>
            <span className="format-tag">API</span>
            <span className="format-tag">S3 / GCS</span>
          </div>
        </div>

        <div className="term">
          <div className="win-bar">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="win-title">conversation.json</span>
          </div>
          <div className="term-body">
            <span className="ln">
              {"{"} <span className="prop">"role"</span>:{" "}
              <span className="str">"user"</span>,
            </span>
            <span className="ln">
              {"  "}<span className="prop">"content"</span>:{" "}
              <span className="str">
                "What's the best way to implement
              </span>
            </span>
            <span className="ln">
              {"   "}
              <span className="str">
                rate limiting in a distributed system?"
              </span>
              ,
            </span>
            <span className="ln">
              {"  "}<span className="prop">"timestamp"</span>:{" "}
              <span className="str">"2026-09-27T09:14:22Z"</span>,
            </span>
            <span className="ln">
              {"  "}<span className="prop">"metadata"</span>: {"{"}
            </span>
            <span className="ln">
              {"    "}<span className="prop">"model"</span>:{" "}
              <span className="str">"gpt-4o"</span>,
            </span>
            <span className="ln">
              {"    "}<span className="prop">"provider"</span>:{" "}
              <span className="str">"openai"</span>,
            </span>
            <span className="ln">
              {"    "}<span className="prop">"turn"</span>:{" "}
              <span className="fn">1</span>,
            </span>
            <span className="ln">
              {"    "}<span className="prop">"has_attachments"</span>:{" "}
              <span className="fn">false</span>
            </span>
            <span className="ln">{"  }"}</span>
            <span className="ln">{"}"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
