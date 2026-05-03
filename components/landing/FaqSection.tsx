const FAQ_ITEMS = [
  {
    question: "Can I work offline on set?",
    answer:
      "Yes. Scenoo is designed for remote locations. All your work saves locally and syncs automatically when you reconnect to the internet.",
  },
  {
    question: "What script formats are supported?",
    answer:
      "We natively support importing standard PDF scripts, Final Draft (.fdx), and Fountain text files.",
  },
  {
    question: "How does collaboration work?",
    answer:
      "Share a secure link with your DP, Director, or AD. You control read/write permissions for specific modules like the shotlist or breakdown.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-24 px-8 max-w-3xl mx-auto" id="faq">
      <h2 className="text-h1 text-center mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group bg-surface-container-lowest border border-outline-variant rounded-lg p-6 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer text-h3">
              {item.question}
              <span className="material-symbols-outlined group-open:-rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <p className="text-body-md text-on-surface-variant mt-4 pt-4 border-t border-outline-variant">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
