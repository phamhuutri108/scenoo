const FEATURES = [
  {
    icon: "draw",
    iconBg: "bg-primary-fixed",
    iconColor: "text-on-primary-fixed-variant",
    title: "Smart Line Scripting",
    description:
      "Draw lines naturally. Scenoo intelligently snaps to character dialogues and action blocks, saving hours of manual formatting.",
    tags: null,
  },
  {
    icon: "category",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-on-tertiary-fixed-variant",
    title: "Industry-Standard Breakdown",
    description:
      "Tag elements directly on the script with standard color categories.",
    tags: [
      { label: "Cast", className: "bg-red-100 text-red-800" },
      { label: "Props", className: "bg-blue-100 text-blue-800" },
      { label: "Wardrobe", className: "bg-green-100 text-green-800" },
    ],
  },
  {
    icon: "view_list",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed-variant",
    title: "Excel-like Shotlist",
    description:
      "Manage your coverage with an advanced spreadsheet view featuring 19 customizable fields tailored for cinematography.",
    tags: null,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-surface-container-lowest px-8" id="features">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-h1 text-center mb-16">
          Professional Tools for Every Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-xl border border-outline-variant bg-surface-bright shadow-sm flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.iconBg} flex items-center justify-center mb-6`}
              >
                <span className={`material-symbols-outlined ${feature.iconColor}`}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-h2 mb-4">{feature.title}</h3>
              <p className="text-body-md text-on-surface-variant flex-grow mb-4">
                {feature.description}
              </p>
              {feature.tags && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`px-2 py-1 rounded text-label-sm ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
