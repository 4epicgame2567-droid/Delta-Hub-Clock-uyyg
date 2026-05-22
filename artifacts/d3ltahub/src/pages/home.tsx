import { useState, useRef } from "react";
import { Search, Globe, X, ExternalLink, ChevronRight, Shield, Zap, Lock } from "lucide-react";

const PROXY_BASE = "https://interstellar.jammer.works/";

const QUICK_LINKS = [
  { label: "YouTube", url: "https://www.youtube.com", color: "bg-red-100 text-red-600" },
  { label: "Google", url: "https://www.google.com", color: "bg-blue-100 text-blue-600" },
  { label: "Reddit", url: "https://www.reddit.com", color: "bg-orange-100 text-orange-600" },
  { label: "Discord", url: "https://discord.com", color: "bg-indigo-100 text-indigo-700" },
  { label: "Twitter/X", url: "https://twitter.com", color: "bg-gray-100 text-gray-700" },
  { label: "Wikipedia", url: "https://www.wikipedia.org", color: "bg-gray-100 text-gray-600" },
];

const FEATURES = [
  { icon: Shield, title: "Private Browsing", desc: "Your browsing activity stays between you and D3LTAHUB." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized proxy routing gets you where you want to go." },
  { icon: Lock, title: "Tab Cloaking", desc: "Disguise your tab as anything — set a custom title and icon." },
];

function buildProxyUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    if (url.includes(".") && !url.includes(" ")) {
      url = "https://" + url;
    } else {
      url = "https://www.google.com/search?q=" + encodeURIComponent(url);
    }
  }
  return PROXY_BASE + encodeURIComponent(url);
}

export default function Home() {
  const [input, setInput] = useState("");
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleGo() {
    if (!input.trim()) return;
    const url = buildProxyUrl(input);
    setProxyUrl(url);
    setLoading(true);
  }

  function handleClose() {
    setProxyUrl(null);
    setInput("");
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleGo();
  }

  if (proxyUrl) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col" style={{ paddingTop: "57px" }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
            <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { const url = buildProxyUrl(input); setProxyUrl(url); setLoading(true); } }}
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Enter URL or search..."
            />
          </div>
          <button
            onClick={() => { const url = buildProxyUrl(input); setProxyUrl(url); setLoading(true); }}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Go
          </button>
          <a
            href={proxyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          )}
          <iframe
            src={proxyUrl}
            className="proxy-frame"
            onLoad={() => setLoading(false)}
            title="Proxy Browser"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: "57px" }}>
      {/* Hero */}
      <section className="hero-gradient py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Fast & Private Web Access
          </div>
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4">
            D3LTA<span className="text-primary">HUB</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Bypass restrictions and browse freely. Enter any URL or search term below.
          </p>

          {/* Search bar */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-md max-w-2xl mx-auto focus-within:border-primary/50 focus-within:shadow-lg transition-all">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground text-base"
              placeholder="Enter URL or search Google..."
              autoFocus
            />
            <button
              onClick={handleGo}
              className="flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold glow-primary hover:opacity-90 transition-all active:scale-95"
            >
              Go <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {QUICK_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => { setInput(link.url); setTimeout(handleGo, 50); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 ${link.color}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6 card-hover">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <div className="text-center pb-10 px-6">
        <p className="text-xs text-muted-foreground/60 max-w-md mx-auto">
          D3LTAHUB routes your requests through a proxy server. Some sites may require direct access.
        </p>
      </div>
    </div>
  );
}
