import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, RefreshCw } from "lucide-react";

type ClothingItem = {
  id: string;
  type: "accessories" | "top" | "bottom" | "shoes";
  name: string;
  color: string;
  image?: string;
  filters?: string[];
};

type GeneratePageProps = {
  clothingItems: ClothingItem[];
  onSaveOutfit: (outfit: ClothingItem[]) => void;
};

export function GeneratePage({ clothingItems, onSaveOutfit }: GeneratePageProps) {
  const [generatedOutfit, setGeneratedOutfit] = useState<ClothingItem[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState({
    occasion: "all",
    weather: "all",
    colorScheme: "all",
  });

  const generateOutfit = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const accessories = clothingItems.filter((item) => item.type === "accessories");
      const tops = clothingItems.filter((item) => item.type === "top");
      const bottoms = clothingItems.filter((item) => item.type === "bottom");
      const shoes = clothingItems.filter((item) => item.type === "shoes");

      const outfit: ClothingItem[] = [];

      if (accessories.length > 0) {
        outfit.push(accessories[Math.floor(Math.random() * accessories.length)]);
      }
      if (tops.length > 0) {
        outfit.push(tops[Math.floor(Math.random() * tops.length)]);
      }
      if (bottoms.length > 0) {
        outfit.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
      }
      if (shoes.length > 0) {
        outfit.push(shoes[Math.floor(Math.random() * shoes.length)]);
      }

      setGeneratedOutfit(outfit);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = () => {
    if (generatedOutfit) {
      onSaveOutfit(generatedOutfit);
    }
  };

  return (
    <div className="h-screen overflow-y-auto px-8 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl mb-6" style={{ color: "#4A2574" }}>
          Generate Outfit
        </h1>

        {/* Preferences */}
        <div
          className="rounded-3xl p-6 backdrop-blur-md space-y-5 mb-8"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="text-sm mb-4" style={{ color: "#4A2574" }}>
            Preferences (Optional)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Occasion
              </label>
              <select
                value={preferences.occasion}
                onChange={(e) => setPreferences({ ...preferences, occasion: e.target.value })}
                className="w-full h-10 rounded-full px-4 text-xs capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="all">Any</option>
                <option value="casual">Casual</option>
                <option value="party">Party</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Weather
              </label>
              <select
                value={preferences.weather}
                onChange={(e) => setPreferences({ ...preferences, weather: e.target.value })}
                className="w-full h-10 rounded-full px-4 text-xs capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="all">Any</option>
                <option value="sunny">Sunny</option>
                <option value="rainy">Rainy</option>
                <option value="cold">Cold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Color Scheme
              </label>
              <select
                value={preferences.colorScheme}
                onChange={(e) => setPreferences({ ...preferences, colorScheme: e.target.value })}
                className="w-full h-10 rounded-full px-4 text-xs capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="all">Any</option>
                <option value="pastel">Pastel</option>
                <option value="neutral">Neutral</option>
                <option value="vibrant">Vibrant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generateOutfit}
          disabled={isGenerating || clothingItems.length === 0}
          className="w-full h-16 rounded-full flex items-center justify-center gap-3 text-base transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          style={{
            backgroundColor: "#924DBF",
            color: "white",
          }}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={20} />
              </motion.div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Generate Outfit</span>
            </>
          )}
        </button>

        {/* Generated outfit display */}
        {generatedOutfit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-8 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <h3 className="text-lg mb-6 text-center" style={{ color: "#4A2574" }}>
              Your Generated Outfit
            </h3>

            {/* Outfit preview */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-40 h-64"
              >
                <div className="flex flex-col items-center justify-start space-y-2">
                  {/* Head */}
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: "#9E72C3", opacity: 0.3 }}
                  />

                  {/* Items */}
                  {generatedOutfit
                    .sort((a, b) => {
                      const order = ["accessories", "top", "bottom", "shoes"];
                      return order.indexOf(a.type) - order.indexOf(b.type);
                    })
                    .map((item) => {
                      const sizes = {
                        accessories: "w-16 h-8",
                        top: "w-24 h-16",
                        bottom: "w-20 h-24",
                        shoes: "w-16 h-10",
                      };

                      return (
                        <div
                          key={item.id}
                          className={`${sizes[item.type]} rounded-2xl flex items-center justify-center`}
                          style={{
                            backgroundColor: item.color,
                            boxShadow: "0 4px 16px rgba(139, 123, 168, 0.15)",
                          }}
                        />
                      );
                    })}
                </div>
              </motion.div>
            </div>

            {/* Outfit details */}
            <div className="space-y-3 mb-6">
              {generatedOutfit.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#4A2574" }}
                >
                  <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: item.color }} />
                  <span className="capitalize opacity-60">{item.type}:</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={generateOutfit}
                className="flex-1 h-12 rounded-full flex items-center justify-center gap-2 backdrop-blur-md transition-all hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  color: "#4A2574",
                }}
              >
                <RefreshCw size={16} />
                <span>Regenerate</span>
              </button>

              <button
                onClick={handleSave}
                className="flex-1 h-12 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{
                  backgroundColor: "#7338A0",
                  color: "white",
                }}
              >
                <Sparkles size={16} />
                <span>Save Outfit</span>
              </button>
            </div>
          </motion.div>
        )}

        {clothingItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "#9E72C3" }}>
              Upload some clothing items first to generate outfits!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
