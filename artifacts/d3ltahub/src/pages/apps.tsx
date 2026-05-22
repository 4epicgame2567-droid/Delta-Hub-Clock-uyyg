import { useState } from "react";
import { X, ExternalLink, AppWindow } from "lucide-react";

const APPS = [
  {
    title: "Google Docs",
    desc: "Create and edit documents online",
    url: "https://docs.google.com",
    category: "Productivity",
    emoji: "📄",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    title: "Google Slides",
    desc: "Build presentations in your browser",
    url: "https://slides.google.com",
    category: "Productivity",
    emoji: "📊",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
  },
  {
    title: "Scratch",
    desc: "Code creative projects visually",
    url: "https://scratch.mit.edu",
    category: "Creative",
    emoji: "🐱",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    title: "Canva",
    desc: "Design graphics, posters & more",
    url: "https://www.canva.com",
    category: "Creative",
    emoji: "🎨",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    title: "Khan Academy",
    desc: "Free courses on any subject",
    url: "https://www.khanacademy.org",
    category: "Education",
    emoji: "🎓",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
  },
  {
    title: "Duolingo",
    desc: "Learn a new language daily",
    url: "https://www.duolingo.com",
    category: "Education",
    emoji: "🦜",
    color: "bg-lime-50 border-lime-200",
    iconBg: "bg-lime-100",
  },
  {
    title: "Spotify",
    desc: "Stream music & podcasts",
    url: "https://open.spotify.com",
    category: "Entertainment",
    emoji: "🎵",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
  },
  {
    title: "GitHub",
    desc: "Code collaboration platform",
    url: "https://github.com",
    category: "Dev",
    emoji: "🐙",
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
  },
  {
    title: "Replit",
    desc: "Code in any language online",
    url: "https://replit.com",
    category: "Dev",
    emoji: "♾️",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
  },
  {
    title: "Figma",
    desc: "Design and prototype UIs",
    url: "https://www.figma.com",
    category: "Creative",
    emoji: "✏️",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    title: "Notion",
    desc: "All-in-one notes and wiki",
    url: "https://www.notion.so",
    category: "Productivity",
    emoji: "📝",
    color: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
  },
  {
    title: "ChatGPT",
    desc: "AI assistant for any question",
    url: "https://chat.openai.com",
    category: "AI",
    emoji: "🤖",
    color: "bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100",
  },
];

const CATEGORIES = ["All", "Productivity", "Creative", "Education", "Entertainment", "Dev", "AI"];

export default function Apps() {
  const [activeApp, setActiveApp] = useState<(typeof APPS)[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? APPS : APPS.filter(a => a.category === filter);

  if (activeApp) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col" style={{ paddingTop: "57px" }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
          <button
            onClick={() => { setActiveApp(null); setLoading(false); }}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="text-lg">{activeApp.emoji}</span>
          <span className="text-sm font-semibold text-foreground">{activeApp.title}</span>
          <span className="text-xs text-muted-foreground ml-1">— {activeApp.desc}</span>
          <div className="flex-1" />
          <a
            href={activeApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open tab
          </a>
        </div>
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading {activeApp.title}...</p>
              </div>
            </div>
          )}
          <iframe
            src={activeApp.url}
            className="proxy-frame"
            onLoad={() => setLoading(false)}
            title={activeApp.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: "57px" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">
            <span className="text-primary">Apps</span>
          </h1>
          <p className="text-muted-foreground">Quick access to your favorite web apps</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(app => (
            <button
              key={app.title}
              onClick={() => { setActiveApp(app); setLoading(true); }}
              className={`bg-card border rounded-2xl p-5 card-hover text-left flex flex-col gap-3 ${app.color}`}
            >
              <div className={`w-12 h-12 rounded-xl ${app.iconBg} flex items-center justify-center text-2xl`}>
                {app.emoji}
              </div>
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-semibold text-foreground text-sm">{app.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{app.desc}</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-white/60 text-muted-foreground">{app.category}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 p-4 rounded-2xl bg-muted/50 border border-border flex items-start gap-3">
          <AppWindow className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Want to add an app?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Use the Proxy tab and enter any URL to access any web app directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
