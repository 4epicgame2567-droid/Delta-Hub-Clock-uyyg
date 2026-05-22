import { Link } from "wouter";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: "57px" }}>
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-black text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all glow-primary"
        >
          <Home className="w-4 h-4" />
          Back to D3LTAHUB
        </Link>
      </div>
    </div>
  );
}
