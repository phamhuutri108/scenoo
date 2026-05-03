import Image from "next/image";

const BLOG_POSTS = [
  {
    category: "Tutorial",
    categoryColor: "text-primary",
    title: "Mastering Split Lines",
    description:
      "Learn how to easily manage overlapping dialogue and complex action sequences in your line script.",
    image: "https://picsum.photos/seed/blog-script/600/400",
    imageAlt: "Close up of a film script with handwritten notes and a pen",
  },
  {
    category: "Workflow",
    categoryColor: "text-tertiary",
    title: "Auto-Sync Shotlist",
    description:
      "Discover how tying your shotlist directly to scene numbers keeps your entire production aligned automatically.",
    image: "https://picsum.photos/seed/blog-monitor/600/400",
    imageAlt:
      "Modern flat screen monitor displaying a complex spreadsheet on a clean desk",
  },
  {
    category: "Best Practices",
    categoryColor: "text-brand-amber",
    title: "DP Collaboration",
    description:
      "Tips for sharing access and iterating on coverage plans with your Director of Photography.",
    image: "https://picsum.photos/seed/blog-filmset/600/400",
    imageAlt:
      "Two people looking at an ipad on a film set with a clapperboard in the foreground",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-surface-container-lowest px-8" id="blog">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-h1 mb-2">Learn Scenoo</h2>
            <p className="text-body-md text-on-surface-variant">
              Master your workflow with our quick guides.
            </p>
          </div>
          <a
            href="#"
            className="text-primary text-label-md flex items-center gap-1 hover:underline"
          >
            View all{" "}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              arrow_forward
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <a
              key={post.title}
              href="#"
              className="group block rounded-xl border border-outline-variant overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-surface-container-high relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span
                  className={`${post.categoryColor} text-label-sm uppercase tracking-wider mb-2 block`}
                >
                  {post.category}
                </span>
                <h3 className="text-h3 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {post.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
