import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAua-U0jsAh8OCeUclNVeRWpgrISlH3KU",
  authDomain: "digi-closet-app.firebaseapp.com",
  projectId: "digi-closet-app",
  storageBucket: "digi-closet-app.firebasestorage.app",
  messagingSenderId: "453362560923",
  appId: "1:453362560923:web:9ef7dde97d0ce86d48fb3e",
  measurementId: "G-SS00SK5X79",
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
