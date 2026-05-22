import { Link, useLocation } from "wouter";
import { Globe, Gamepad2, AppWindow, Settings, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Proxy", icon: Globe },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/apps", label: "Apps", icon: AppWindow },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <Zap className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
        </div>
        <span className="font-black text-xl tracking-tight text-foreground">
          D3LTA<span className="text-primary">HUB</span>
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
