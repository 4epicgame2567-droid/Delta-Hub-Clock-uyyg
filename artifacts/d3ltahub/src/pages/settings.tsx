import { useState, useEffect } from "react";
import { Shield, Eye, Check, Info, RefreshCw } from "lucide-react";
import {
  type TabCloakSettings,
  loadCloakSettings,
  saveCloakSettings,
  applyCloak,
  removeCloak,
} from "@/hooks/useTabCloak";

const CLOAK_PRESETS = [
  {
    label: "Google Classroom",
    title: "Google Classroom",
    faviconUrl: "https://ssl.gstatic.com/classroom/favicon.png",
  },
  {
    label: "Khan Academy",
    title: "Khan Academy",
    faviconUrl: "https://www.khanacademy.org/favicon.ico",
  },
  {
    label: "Duolingo",
    title: "Duolingo",
    faviconUrl: "https://www.duolingo.com/favicon.ico",
  },
  {
    label: "Google Docs",
    title: "Untitled document - Google Docs",
    faviconUrl: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
  },
  {
    label: "Wikipedia",
    title: "Wikipedia",
    faviconUrl: "https://en.wikipedia.org/favicon.ico",
  },
  {
    label: "Quizlet",
    title: "Quizlet",
    faviconUrl: "https://quizlet.com/favicon.ico",
  },
];

export default function Settings() {
  const [cloak, setCloak] = useState<TabCloakSettings>(() => loadCloakSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const current = loadCloakSettings();
    setCloak(current);
  }, []);

  function handleSave() {
    saveCloakSettings(cloak);
    if (cloak.enabled) {
      applyCloak(cloak);
    } else {
      removeCloak();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function applyPreset(preset: (typeof CLOAK_PRESETS)[0]) {
    setCloak(prev => ({ ...prev, title: preset.title, faviconUrl: preset.faviconUrl }));
  }

  function handleReset() {
    const reset: TabCloakSettings = { enabled: false, title: "", faviconUrl: "" };
    setCloak(reset);
    saveCloakSettings(reset);
    removeCloak();
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: "57px" }}>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">
            <span className="text-primary">Settings</span>
          </h1>
          <p className="text-muted-foreground">Customize D3LTAHUB to your liking</p>
        </div>

        {/* Tab Cloaking */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Tab Cloaking</h2>
              <p className="text-xs text-muted-foreground">Change what your browser tab shows</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Info banner */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/15">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed">
                Tab cloaking changes the tab title and icon to disguise what you're viewing. It only affects this tab — no browser extensions needed.
              </p>
            </div>

            {/* Enable toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Enable Tab Cloaking</p>
                <p className="text-xs text-muted-foreground mt-0.5">Apply custom title and icon to this tab</p>
              </div>
              <button
                onClick={() => setCloak(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${cloak.enabled ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${cloak.enabled ? "left-7" : "left-1"}`} />
              </button>
            </div>

            {cloak.enabled && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Presets */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Quick Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CLOAK_PRESETS.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => applyPreset(preset)}
                        className={`px-3 py-2 rounded-xl text-sm text-left transition-all border ${
                          cloak.title === preset.title
                            ? "bg-primary/10 border-primary/30 text-primary font-medium"
                            : "bg-muted border-border text-muted-foreground hover:text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom title */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Custom Tab Title</label>
                  <input
                    value={cloak.title}
                    onChange={e => setCloak(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Google Classroom"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                  />
                </div>

                {/* Custom favicon */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Custom Favicon URL</label>
                  <input
                    value={cloak.faviconUrl}
                    onChange={e => setCloak(prev => ({ ...prev, faviconUrl: e.target.value }))}
                    placeholder="https://example.com/favicon.ico"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
                  />
                  {cloak.faviconUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={cloak.faviconUrl}
                        alt="Favicon preview"
                        className="w-5 h-5 rounded-sm"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <span className="text-xs text-muted-foreground">Favicon preview</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-primary text-primary-foreground glow-primary hover:opacity-90"
                }`}
              >
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Settings"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all border border-border"
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Privacy</h2>
              <p className="text-xs text-muted-foreground">Your data stays local</p>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {[
              ["Settings stored locally", "All preferences are saved in your browser's local storage only."],
              ["No tracking", "D3LTAHUB doesn't log or track your browsing activity."],
              ["No accounts needed", "No sign-up, no email, no personal data collected."],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
