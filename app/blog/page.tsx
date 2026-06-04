import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | WebsitesForFree — Tips For UK Small Businesses",
  description:
    "Practical tips and insights for UK small business owners — websites, SEO, marketing, and more.",
};

const categoryColors: Record<string, string> = {
  "Business Tips": "bg-blue-50 text-blue-700",
  "Marketing": "bg-purple-50 text-purple-700",
  "Website Tips": "bg-orange-50 text-orange-700",
  "Industries": "bg-green-50 text-green-700",
  "SEO": "bg-emerald-50 text-emerald-700",
  "Strategy": "bg-indigo-50 text-indigo-700",
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-4">
            📝 Practical advice
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Tips For Small Business Owners
          </h1>
          <p className="text-xl text-gray-600">
            Practical guides to help you grow your business online.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover"
              >
                {/* Placeholder header */}
                <div className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">
                  <span className="text-4xl">
                    {post.category === "SEO" ? "🔍" :
                     post.category === "Marketing" ? "📣" :
                     post.category === "Industries" ? "🏗️" :
                     post.category === "Strategy" ? "♟️" :
                     post.category === "Website Tips" ? "💻" : "💡"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-50 text-gray-600"}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime} read</span>
                  </div>
                  <h2 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to get online?
          </h2>
          <p className="text-indigo-200 mb-8">
            Stop reading about websites — get one built for free.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-600 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:-translate-y-1"
          >
            Start My Free Website →
          </Link>
        </div>
      </section>
    </div>
  );
}
