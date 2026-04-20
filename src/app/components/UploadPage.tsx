import { useState } from "react";
import { Upload as UploadIcon, X } from "lucide-react";

type ClothingItem = {
  id: string;
  type: "accessories" | "top" | "bottom" | "shoes";
  name: string;
  color: string;
  image?: string;
  filters?: string[];
};

type UploadPageProps = {
  onUpload: (item: Omit<ClothingItem, "id">) => void;
};

export function UploadPage({ onUpload }: UploadPageProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "top" as ClothingItem["type"],
    name: "",
    color: "#924DBF",
    category: "",
    occasion: "casual",
    weather: "sunny",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: Omit<ClothingItem, "id"> = {
      type: formData.type,
      name: formData.name,
      color: formData.color,
      image: previewImage || undefined,
      filters: formData.category ? [formData.category] : [],
    };

    onUpload(newItem);

    setPreviewImage(null);
    setFormData({
      type: "top",
      name: "",
      color: "#924DBF",
      category: "",
      occasion: "casual",
      weather: "sunny",
    });
  };

  const categoryOptions: Record<ClothingItem["type"], string[]> = {
    accessories: ["hat", "bag", "jewelry", "scarf", "belt"],
    top: ["crop", "full sleeve", "tank", "blouse", "sweater"],
    bottom: ["jeans", "skirt", "shorts", "trousers", "leggings"],
    shoes: ["sneakers", "heels", "boots", "sandals", "flats"],
  };

  return (
    <div className="h-screen overflow-y-auto px-8 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl mb-6" style={{ color: "#4A2574" }}>
          Upload Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload */}
          <div>
            <label className="block text-sm mb-3" style={{ color: "#4A2574" }}>
              Upload Image
            </label>
            <div
              className="relative rounded-3xl overflow-hidden backdrop-blur-sm cursor-pointer hover:scale-105 transition-all"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                border: "2px dashed rgba(139, 123, 168, 0.3)",
                height: "300px",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {previewImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      color: "#7338A0",
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <UploadIcon size={48} style={{ color: "#9E72C3" }} className="mb-4" />
                  <p className="text-sm" style={{ color: "#4A2574" }}>
                    Click or drag to upload
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form fields */}
          <div
            className="rounded-3xl p-6 backdrop-blur-md space-y-5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Item type */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Item Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as ClothingItem["type"], category: "" })
                }
                className="w-full h-11 rounded-full px-4 text-sm capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
                required
              >
                <option value="accessories">Accessories</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 rounded-full px-4 text-sm capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
                required
              >
                <option value="">Select category</option>
                {categoryOptions[formData.type].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Item name */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Item Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Lavender Crop Top"
                className="w-full h-11 rounded-full px-4 text-sm backdrop-blur-sm border-none outline-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                }}
                required
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Primary Color
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-16 h-11 rounded-full cursor-pointer border-none outline-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="flex-1 h-11 rounded-full px-4 text-sm backdrop-blur-sm border-none outline-none"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "#4A2574",
                  }}
                />
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Occasion
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full h-11 rounded-full px-4 text-sm capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="casual">Casual</option>
                <option value="party">Party</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            {/* Weather */}
            <div>
              <label className="block text-xs mb-2" style={{ color: "#4A2574" }}>
                Weather
              </label>
              <select
                value={formData.weather}
                onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                className="w-full h-11 rounded-full px-4 text-sm capitalize backdrop-blur-sm border-none outline-none appearance-none cursor-pointer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%234A2574' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="sunny">Sunny</option>
                <option value="rainy">Rainy</option>
                <option value="cold">Cold</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full h-14 rounded-full text-sm transition-all hover:scale-105"
            style={{
              backgroundColor: "#924DBF",
              color: "white",
            }}
          >
            Add to Closet
          </button>
        </form>
      </div>
    </div>
  );
}
