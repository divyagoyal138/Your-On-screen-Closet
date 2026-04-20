import { Home, Grid, Upload, Heart, Sparkles, LogOut } from "lucide-react";

type SidebarProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  occasionFilter: string;
  weatherFilter: string;
  onLogout: () => void;
};

export function Sidebar({ currentPage, onNavigate, occasionFilter, weatherFilter, onLogout }: SidebarProps) {
  const navItems = [
    { id: "home", label: "HOME", icon: Home },
    { id: "all", label: "ALL", icon: Grid },
    { id: "upload", label: "UPLOAD", icon: Upload },
    { id: "saved", label: "SAVED OUTFITS", icon: Heart },
    { id: "generate", label: "GENERATE", icon: Sparkles },
  ];

  return (
    <div
      className="h-screen w-56 backdrop-blur-md flex flex-col p-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        borderRight: "1px solid rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Logo */}
      <div className="mb-8 px-2 pt-4">
        <h2 className="text-xl" style={{ color: "#4A2574" }}>
          My Closet
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: isActive ? "#7338A0" : "rgba(255, 255, 255, 0.3)",
                color: isActive ? "white" : "#4A2574",
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Current filters display */}
      <div
        className="mt-4 p-4 rounded-2xl text-xs space-y-2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          color: "#4A2574",
        }}
      >
        <div>
          <span className="opacity-60">Occasion: </span>
          <span className="capitalize">{occasionFilter}</span>
        </div>
        <div>
          <span className="opacity-60">Weather: </span>
          <span className="capitalize">{weatherFilter}</span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm transition-all hover:scale-105"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          color: "#4A2574",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <LogOut size={16} />
        <span>LOG OUT</span>
      </button>
    </div>
  );
}
