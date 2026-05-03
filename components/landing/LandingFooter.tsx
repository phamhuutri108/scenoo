const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Support", href: "#" },
  { label: "Press Kit", href: "#" },
];

export default function LandingFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 w-full py-12">
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-lg font-bold text-gray-900">Scenoo</div>
        <nav className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="text-xs text-gray-500">
          © 2024 FilmPro Production Systems. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
