import { Trash2 } from "lucide-react";

type ClothingItem = {
  id: string;
  type: "accessories" | "top" | "bottom" | "shoes";
  name: string;
  color: string;
  image?: string;
  filters?: string[];
};

type SavedOutfit = {
  id: string;
  items: ClothingItem[];
  savedAt: Date;
};

type SavedPageProps = {
  savedOutfits: SavedOutfit[];
  onDelete: (id: string) => void;
};

export function SavedPage({ savedOutfits, onDelete }: SavedPageProps) {
  return (
    <div className="h-screen overflow-y-auto px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-6" style={{ color: "#4A2574" }}>
          Saved Outfits
        </h1>

        {savedOutfits.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm" style={{ color: "#9E72C3" }}>
              No saved outfits yet. Create and save an outfit to see it here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="rounded-3xl p-6 backdrop-blur-md relative hover:scale-105 transition-all"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                {/* Delete button */}
                <button
                  onClick={() => onDelete(outfit.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md hover:scale-110 transition-all z-10"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#FF6B9D",
                  }}
                >
                  <Trash2 size={14} />
                </button>

                {/* Outfit preview */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-52">
                    <div className="flex flex-col items-center justify-start space-y-1.5">
                      {/* Head */}
                      <div
                        className="w-10 h-10 rounded-full"
                        style={{ backgroundColor: "#9E72C3", opacity: 0.3 }}
                      />

                      {/* Accessories */}
                      {outfit.items.find((i) => i.type === "accessories") && (
                        <div
                          className="w-14 h-6 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: outfit.items.find((i) => i.type === "accessories")
                              ?.color,
                            boxShadow: "0 4px 16px rgba(139, 123, 168, 0.15)",
                          }}
                        />
                      )}

                      {/* Top */}
                      {outfit.items.find((i) => i.type === "top") && (
                        <div
                          className="w-20 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: outfit.items.find((i) => i.type === "top")?.color,
                            boxShadow: "0 4px 16px rgba(139, 123, 168, 0.15)",
                          }}
                        />
                      )}

                      {/* Bottom */}
                      {outfit.items.find((i) => i.type === "bottom") && (
                        <div
                          className="w-16 h-20 rounded-2xl flex items-center justify-center"
                          style={{
                            backgroundColor: outfit.items.find((i) => i.type === "bottom")?.color,
                            boxShadow: "0 4px 16px rgba(139, 123, 168, 0.15)",
                          }}
                        />
                      )}

                      {/* Shoes */}
                      {outfit.items.find((i) => i.type === "shoes") && (
                        <div
                          className="w-14 h-7 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: outfit.items.find((i) => i.type === "shoes")?.color,
                            boxShadow: "0 4px 16px rgba(139, 123, 168, 0.15)",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Outfit details */}
                <div className="space-y-2">
                  {outfit.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 text-xs"
                      style={{ color: "#4A2574" }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="capitalize opacity-60">{item.type}:</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>

                {/* Saved date */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs" style={{ color: "#9E72C3" }}>
                    Saved {outfit.savedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
