import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./components/HomePage";
import { AllPage } from "./components/AllPage";
import { UploadPage } from "./components/UploadPage";
import { SavedPage } from "./components/SavedPage";
import { GeneratePage } from "./components/GeneratePage";
import { auth } from "../firebase";

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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [occasionFilter, setOccasionFilter] = useState("all");
  const [weatherFilter, setWeatherFilter] = useState("all");

  const [clothingItems, setClothingItems] = useState<
    ClothingItem[]
  >([]);

  const [savedOutfits, setSavedOutfits] = useState<
    SavedOutfit[]
  >([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user));
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const getFirebaseErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = String(error.code);
      if (code === "auth/invalid-credential") {
        return "Invalid email or password.";
      }
      if (code === "auth/email-already-in-use") {
        return "This email is already registered.";
      }
      if (code === "auth/weak-password") {
        return "Password is too weak.";
      }
    }

    return "Something went wrong. Please try again.";
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSignup(false);
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error));
    }
  };

  const handleUpload = (item: Omit<ClothingItem, "id">) => {
    const newItem: ClothingItem = {
      ...item,
      id: Date.now().toString(),
    };
    setClothingItems([...clothingItems, newItem]);
  };

  const handleSaveOutfit = (outfit: ClothingItem[]) => {
    const newOutfit: SavedOutfit = {
      id: Date.now().toString(),
      items: outfit,
      savedAt: new Date(),
    };
    setSavedOutfits([...savedOutfits, newOutfit]);
  };

  const handleDeleteOutfit = (id: string) => {
    setSavedOutfits(
      savedOutfits.filter((outfit) => outfit.id !== id),
    );
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isAuthLoading) {
    return (
      <div
        className="h-screen w-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #C4B0E8 0%, #A07FD9 50%, #8B6FCC 100%)",
          color: "#4A2574",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showSignup) {
      return <SignupPage onSignup={handleSignup} onBackToLogin={() => setShowSignup(false)} />;
    }
    return <LoginPage onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />;
  }

  return (
    <div
      className="h-screen w-full flex overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #C4B0E8 0%, #A07FD9 50%, #8B6FCC 100%)",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        occasionFilter={occasionFilter}
        weatherFilter={weatherFilter}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 relative">
        {currentPage === "home" && (
          <HomePage
            occasionFilter={occasionFilter}
            weatherFilter={weatherFilter}
            setOccasionFilter={setOccasionFilter}
            setWeatherFilter={setWeatherFilter}
            clothingItems={clothingItems}
            onSaveOutfit={handleSaveOutfit}
          />
        )}

        {currentPage === "all" && (
          <AllPage clothingItems={clothingItems} />
        )}

        {currentPage === "upload" && (
          <UploadPage onUpload={handleUpload} />
        )}

        {currentPage === "saved" && (
          <SavedPage
            savedOutfits={savedOutfits}
            onDelete={handleDeleteOutfit}
          />
        )}

        {currentPage === "generate" && (
          <GeneratePage
            clothingItems={clothingItems}
            onSaveOutfit={handleSaveOutfit}
          />
        )}
      </div>
    </div>
  );
}
