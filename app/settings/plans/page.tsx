"use client";

export default function PlansPage() {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-display text-on-surface mb-3">Plans that grow with you</h2>
        <div className="inline-flex bg-surface-container-low p-1 rounded-lg">
          <button className="px-6 py-2 bg-white rounded-md shadow-sm text-label-md font-medium text-on-surface cursor-pointer">Individual</button>
          <button className="px-6 py-2 text-on-surface-variant text-label-md font-medium hover:text-on-surface transition-colors cursor-pointer">Team and Enterprise</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pro Plan */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <h3 className="text-h2 text-on-surface mb-2">Pro</h3>
          <p className="text-body-md text-on-surface-variant mb-6">Research, code, and organize</p>
          <div className="mb-6">
            <span className="text-[40px] font-bold text-on-surface">$17</span>
            <span className="text-body-md text-on-surface-variant ml-2">USD / month<br />billed annually</span>
          </div>

          <button className="w-full py-3 border border-outline-variant text-on-surface rounded-lg font-medium hover:bg-surface-container transition-colors mb-8 cursor-pointer">
            Current Plan
          </button>

          <div className="flex-1">
            <p className="text-label-md font-bold text-on-surface mb-4">Everything in Free and:</p>
            <ul className="space-y-3">
              {["Unlimited Cloud Sync", "Advanced Line Scripting tools", "Custom Breakdown Categories", "Export to PDF & Excel"].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0">check</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Max Plan */}
        <div className="bg-surface-container-lowest border-2 border-primary rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
          <h3 className="text-h2 text-on-surface mb-2">Max</h3>
          <p className="text-body-md text-on-surface-variant mb-6">Higher limits, priority access</p>
          <div className="mb-6">
            <span className="text-[40px] font-bold text-on-surface">From $100</span>
            <span className="text-body-md text-on-surface-variant ml-2">USD / month<br />billed monthly</span>
          </div>

          <button className="w-full py-3 bg-on-surface text-surface-container-lowest rounded-lg font-medium hover:bg-on-surface/90 transition-colors mb-8 shadow-sm cursor-pointer">
            Get Max plan
          </button>

          <div className="flex-1">
            <p className="text-label-md font-bold text-on-surface mb-4">Everything in Pro, plus:</p>
            <ul className="space-y-3">
              {["Up to 20x more usage than Pro", "Recommended for Studio teams", "Early access to advanced AI features", "Priority access at high traffic times"].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0">check</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
