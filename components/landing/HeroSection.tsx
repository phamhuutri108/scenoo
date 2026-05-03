export default function HeroSection() {
  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto text-center flex flex-col items-center">
      <h1 className="text-display max-w-3xl mb-6">
        The Ultimate Script Workspace for Filmmakers
      </h1>
      <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12">
        Seamlessly connect Breakdown, Line Scripting, and your Shotlist in one
        intelligent, industry-standard environment.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <button className="flex items-center gap-2 bg-on-background text-background px-6 py-3 rounded-lg text-label-md hover:bg-on-surface-variant transition-colors shadow-sm">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            ios
          </span>
          App Store (iPad)
        </button>
        <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant text-on-background px-6 py-3 rounded-lg text-label-md hover:bg-surface-container-low transition-colors shadow-sm">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            android
          </span>
          Google Play (Tablet)
        </button>
        <button className="flex items-center gap-2 bg-transparent border border-outline-variant text-on-background px-6 py-3 rounded-lg text-label-md hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">laptop_mac</span>
          macOS (.dmg)
        </button>
      </div>

      <div className="w-full max-w-5xl rounded-xl border border-outline-variant shadow-lg overflow-hidden bg-surface-container-lowest">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/hero-app/1200/675"
          alt="Clean, bright software interface showing a film script with colorful highlighters and a detailed shotlist table next to it"
          className="w-full h-auto object-cover opacity-90 mix-blend-multiply"
        />
      </div>
    </section>
  );
}
