import { useState } from "react";

type ClothingItem = {
  id: string;
  type: "accessories" | "top" | "bottom" | "shoes";
  name: string;
  color: string;
  image?: string;
  filters?: string[];
};

type AllPageProps = {
  clothingItems: ClothingItem[];
};

export function AllPage({ clothingItems }: AllPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredItems = clothingItems.filter((item) => {
    if (categoryFilter === "all") return true;
    return item.type === categoryFilter;
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header with filter */}
      <div className="px-8 py-6 border-b border-white/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl mb-4" style={{ color: "#4A2574" }}>
            All Items
          </h1>
          <div className="flex items-center gap-4">
            <label className="text-sm" style={{ color: "#4A2574" }}>
              Filter by:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-full px-4 text-sm capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer w-48"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                color: "#4A2574",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="all">All Categories</option>
              <option value="accessories">Accessories</option>
              <option value="top">Tops</option>
              <option value="bottom">Bottoms</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-sm" style={{ color: "#9E72C3" }}>
                No items found. Upload some clothing items to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden backdrop-blur-sm hover:scale-105 transition-all cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <div
                    className="h-40 flex items-center justify-center"
                    style={{
                      backgroundColor: item.image
                        ? item.color
                        : "rgba(255, 255, 255, 0.25)",
                    }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-[88%] h-[82%] rounded-2xl border border-dashed flex items-center justify-center px-3 text-center"
                        style={{
                          borderColor: "rgba(74, 37, 116, 0.35)",
                          color: "#4A2574",
                          backgroundColor: "rgba(255, 255, 255, 0.45)",
                        }}
                      >
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs capitalize mb-1" style={{ color: "#9E72C3" }}>
                      {item.type}
                    </p>
                    <p className="text-sm" style={{ color: "#4A2574" }}>
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
