import { useState } from "react";
import { X, Gamepad2, ExternalLink } from "lucide-react";

const GAMES = [
  {
    title: "Slope",
    desc: "Ball-rolling 3D endless runner",
    url: "https://slope-game.github.io/",
    category: "Action",
    color: "from-green-400 to-emerald-600",
  },
  {
    title: "1v1.lol",
    desc: "Build and battle arena shooter",
    url: "https://1v1.lol",
    category: "Shooter",
    color: "from-orange-400 to-red-600",
  },
  {
    title: "Snake",
    desc: "Classic snake game, no ads",
    url: "https://playsnake.org/",
    category: "Classic",
    color: "from-lime-400 to-green-600",
  },
  {
    title: "Cookie Clicker",
    desc: "Idle clicker empire building",
    url: "https://orteil.dashnet.org/cookieclicker/",
    category: "Idle",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Tetris",
    desc: "The timeless block stacking game",
    url: "https://tetris.com/play-tetris",
    category: "Classic",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: "2048",
    desc: "Merge tiles to reach 2048",
    url: "https://play2048.co/",
    category: "Puzzle",
    color: "from-amber-400 to-yellow-600",
  },
  {
    title: "Minesweeper",
    desc: "Classic mine-clearing puzzle",
    url: "https://minesweeper.online/",
    category: "Puzzle",
    color: "from-gray-400 to-gray-600",
  },
  {
    title: "Chess",
    desc: "Play chess against the computer",
    url: "https://www.chess.com/play/computer",
    category: "Strategy",
    color: "from-stone-400 to-stone-700",
  },
  {
    title: "Wordle",
    desc: "Guess the 5-letter word",
    url: "https://www.nytimes.com/games/wordle/index.html",
    category: "Word",
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Sudoku",
    desc: "Number logic puzzles",
    url: "https://sudoku.com/",
    category: "Puzzle",
    color: "from-violet-400 to-purple-600",
  },
  {
    title: "Run 3",
    desc: "Endless runner through space tunnels",
    url: "https://www.coolmathgames.com/0-run-3",
    category: "Action",
    color: "from-sky-400 to-blue-600",
  },
  {
    title: "Flappy Bird",
    desc: "Guide the bird through pipes",
    url: "https://flappybird.io/",
    category: "Action",
    color: "from-yellow-300 to-green-500",
  },
];

const CATEGORIES = ["All", "Action", "Classic", "Puzzle", "Idle", "Strategy", "Word", "Shooter"];

export default function Games() {
  const [activeGame, setActiveGame] = useState<(typeof GAMES)[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const [loadingGame, setLoadingGame] = useState(false);

  const filtered = filter === "All" ? GAMES : GAMES.filter(g => g.category === filter);

  if (activeGame) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col" style={{ paddingTop: "57px" }}>
        <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
          <button
            onClick={() => { setActiveGame(null); setLoadingGame(false); }}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${activeGame.color} flex items-center justify-center`}>
            <Gamepad2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground">{activeGame.title}</span>
          <span className="text-xs text-muted-foreground ml-1">— {activeGame.desc}</span>
          <div className="flex-1" />
          <a
            href={activeGame.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open tab
          </a>
        </div>
        <div className="flex-1 relative">
          {loadingGame && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Loading {activeGame.title}...</p>
              </div>
            </div>
          )}
          <iframe
            src={activeGame.url}
            className="proxy-frame"
            onLoad={() => setLoadingGame(false)}
            title={activeGame.title}
            allow="fullscreen; autoplay"
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
            <span className="text-primary">Games</span>
          </h1>
          <p className="text-muted-foreground">Play unblocked games right in your browser</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(game => (
            <button
              key={game.title}
              onClick={() => { setActiveGame(game); setLoadingGame(true); }}
              className="bg-card border border-border rounded-2xl overflow-hidden card-hover text-left group"
            >
              <div className={`h-28 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
                <Gamepad2 className="w-10 h-10 text-white/80" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-semibold text-foreground text-sm">{game.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">{game.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{game.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
