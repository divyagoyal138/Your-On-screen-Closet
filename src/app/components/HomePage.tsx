import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Shuffle } from "lucide-react";

type ClothingItem = {
  id: string;
  type: "accessories" | "top" | "bottom" | "shoes";
  name: string;
  color: string;
  image?: string;
  filters?: string[];
};

type HomePageProps = {
  occasionFilter: string;
  weatherFilter: string;
  setOccasionFilter: (value: string) => void;
  setWeatherFilter: (value: string) => void;
  clothingItems: ClothingItem[];
  onSaveOutfit: (outfit: ClothingItem[]) => void;
};

export function HomePage({
  occasionFilter,
  weatherFilter,
  setOccasionFilter,
  setWeatherFilter,
  clothingItems,
  onSaveOutfit,
}: HomePageProps) {
  const [selectedItems, setSelectedItems] = useState<{
    accessories: number;
    top: number;
    bottom: number;
    shoes: number;
  }>({
    accessories: 0,
    top: 0,
    bottom: 0,
    shoes: 0,
  });

  const [topFilter, setTopFilter] = useState<string>("all");
  const [bottomFilter, setBottomFilter] = useState<string>("all");
  const [shoesFilter, setShoesFilter] = useState<string>("all");

  const getItemsByType = (type: ClothingItem["type"]) => {
    return clothingItems.filter((item) => item.type === type);
  };

  const navigate = (type: ClothingItem["type"], direction: number) => {
    const items = getItemsByType(type);
    if (items.length === 0) return;

    setSelectedItems((prev) => {
      const current = prev[type];
      let next = current + direction;
      if (next < 0) next = items.length - 1;
      if (next >= items.length) next = 0;
      return { ...prev, [type]: next };
    });
  };

  const shuffle = () => {
    setSelectedItems({
      accessories: Math.floor(Math.random() * Math.max(1, getItemsByType("accessories").length)),
      top: Math.floor(Math.random() * Math.max(1, getItemsByType("top").length)),
      bottom: Math.floor(Math.random() * Math.max(1, getItemsByType("bottom").length)),
      shoes: Math.floor(Math.random() * Math.max(1, getItemsByType("shoes").length)),
    });
  };

  const handleSave = () => {
    const outfit = [
      getItemsByType("accessories")[selectedItems.accessories],
      getItemsByType("top")[selectedItems.top],
      getItemsByType("bottom")[selectedItems.bottom],
      getItemsByType("shoes")[selectedItems.shoes],
    ].filter(Boolean);
    onSaveOutfit(outfit);
  };

  const renderCarousel = (type: ClothingItem["type"], label: string) => {
    const items = getItemsByType(type);
    const currentItem = items[selectedItems[type]];

    return (
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <button
            onClick={() => navigate(type, -1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <ChevronLeft size={16} style={{ color: "#7338A0" }} />
          </button>

          <button
            onClick={() => navigate(type, 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <ChevronRight size={16} style={{ color: "#7338A0" }} />
          </button>

          <div className="mx-10 w-32 h-20 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {currentItem ? (
              currentItem.image ? (
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-xs text-center px-2"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                >
                  <div
                    className="w-[88%] h-[78%] rounded-xl border border-dashed flex items-center justify-center px-2"
                    style={{
                      borderColor: "rgba(74, 37, 116, 0.35)",
                      color: "#4A2574",
                      backgroundColor: "rgba(255, 255, 255, 0.45)",
                    }}
                  >
                    <span className="text-[11px]">Upload image</span>
                  </div>
                </div>
              )
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs text-center px-2"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
              >
                <div
                  className="w-[88%] h-[78%] rounded-xl border border-dashed flex items-center justify-center px-2"
                  style={{
                    borderColor: "rgba(74, 37, 116, 0.35)",
                    color: "#4A2574",
                    backgroundColor: "rgba(255, 255, 255, 0.45)",
                  }}
                >
                  <span className="text-[11px]">Upload image</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm capitalize mb-1" style={{ color: "#4A2574" }}>
            {label}
          </h3>
          <p className="text-xs" style={{ color: "#9E72C3" }}>
            {currentItem?.name || "No item selected"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-12 items-start justify-center">
            {/* Left side - Outfit preview */}
            <div className="flex-shrink-0">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-[600px]"
              >
                <div className="flex flex-col items-center justify-start pt-8 space-y-4">
                  <div
                    className="w-36 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor:
                        getItemsByType("accessories")[selectedItems.accessories]?.color ??
                        "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 8px 24px rgba(139, 123, 168, 0.2)",
                    }}
                  >
                    {getItemsByType("accessories")[selectedItems.accessories]?.image ? (
                      <img
                        src={getItemsByType("accessories")[selectedItems.accessories]?.image}
                        alt="Accessory"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-[85%] h-[70%] rounded-xl border border-dashed flex items-center justify-center px-2"
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.65)",
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-52 h-40 rounded-3xl flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor:
                        getItemsByType("top")[selectedItems.top]?.color ??
                        "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 8px 24px rgba(139, 123, 168, 0.2)",
                    }}
                  >
                    {getItemsByType("top")[selectedItems.top]?.image ? (
                      <img
                        src={getItemsByType("top")[selectedItems.top]?.image}
                        alt="Top"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-[85%] h-[76%] rounded-2xl border border-dashed flex items-center justify-center px-2"
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.65)",
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-48 h-52 rounded-3xl flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor:
                        getItemsByType("bottom")[selectedItems.bottom]?.color ??
                        "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 8px 24px rgba(139, 123, 168, 0.2)",
                    }}
                  >
                    {getItemsByType("bottom")[selectedItems.bottom]?.image ? (
                      <img
                        src={getItemsByType("bottom")[selectedItems.bottom]?.image}
                        alt="Bottom"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-[85%] h-[82%] rounded-2xl border border-dashed flex items-center justify-center px-2"
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.65)",
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-36 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor:
                        getItemsByType("shoes")[selectedItems.shoes]?.color ??
                        "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 8px 24px rgba(139, 123, 168, 0.2)",
                    }}
                  >
                    {getItemsByType("shoes")[selectedItems.shoes]?.image ? (
                      <img
                        src={getItemsByType("shoes")[selectedItems.shoes]?.image}
                        alt="Shoes"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-[85%] h-[70%] rounded-xl border border-dashed flex items-center justify-center px-2"
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.65)",
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        <span className="text-xs">Upload image</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Carousels and filters */}
            <div className="flex-1 max-w-lg space-y-10 pt-16">
              {/* Accessories */}
              <div>
                {renderCarousel("accessories", "Accessories")}
              </div>

              {/* Tops with filters */}
              <div className="space-y-3">
                {renderCarousel("top", "Tops")}
                <div className="flex gap-2 flex-wrap pl-2">
                  {["all", "crop", "full sleeve", "tank"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTopFilter(filter)}
                      className="px-4 py-1.5 rounded-full text-xs capitalize transition-all"
                      style={{
                        backgroundColor: topFilter === filter ? "#924DBF" : "rgba(255, 255, 255, 0.5)",
                        color: topFilter === filter ? "white" : "#4A2574",
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottoms with filters */}
              <div className="space-y-3">
                {renderCarousel("bottom", "Bottoms")}
                <div className="flex gap-2 flex-wrap pl-2">
                  {["all", "jeans", "skirt", "shorts"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setBottomFilter(filter)}
                      className="px-4 py-1.5 rounded-full text-xs capitalize transition-all"
                      style={{
                        backgroundColor: bottomFilter === filter ? "#7338A0" : "rgba(255, 255, 255, 0.5)",
                        color: bottomFilter === filter ? "white" : "#4A2574",
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoes with filters */}
              <div className="space-y-3">
                {renderCarousel("shoes", "Shoes")}
                <div className="flex gap-2 flex-wrap pl-2">
                  {["all", "heels", "sneakers", "flats"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setShoesFilter(filter)}
                      className="px-4 py-1.5 rounded-full text-xs capitalize transition-all"
                      style={{
                        backgroundColor: shoesFilter === filter ? "#4A2574" : "rgba(255, 255, 255, 0.5)",
                        color: shoesFilter === filter ? "white" : "#4A2574",
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-8 pb-8">
        <div className="flex gap-3 justify-center max-w-2xl mx-auto">
          <button
            onClick={shuffle}
            className="flex-1 max-w-[140px] h-14 rounded-full flex items-center justify-center gap-2 backdrop-blur-md transition-all hover:scale-105"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
            }}
          >
            <Shuffle size={18} style={{ color: "#7338A0" }} />
            <span style={{ color: "#7338A0" }}>Shuffle</span>
          </button>

          <button
            onClick={handleSave}
            className="flex-1 max-w-[140px] h-14 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{ backgroundColor: "#924DBF", color: "white" }}
          >
            <Heart size={18} fill="white" />
            <span>Save</span>
          </button>
        </div>
      </div>


    </div>
  );
}
