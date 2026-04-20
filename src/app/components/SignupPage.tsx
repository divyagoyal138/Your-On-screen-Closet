import { type FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

type SignupPageProps = {
  onSignup: (email: string, password: string) => Promise<void>;
  onBackToLogin: () => void;
};

export function SignupPage({ onSignup, onBackToLogin }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await onSignup(email, password);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Signup failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #C4B0E8 0%, #A07FD9 50%, #8B6FCC 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6"
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <Sparkles size={48} style={{ color: "#924DBF" }} />
          </motion.div>
          <h1 className="text-3xl mb-2" style={{ color: "#4A2574" }}>
            My Closet
          </h1>
          <p className="text-sm" style={{ color: "#7338A0" }}>
            Create your account
          </p>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-8 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs block mb-2" style={{ color: "#4A2574" }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full h-12 rounded-full px-5 text-sm backdrop-blur-sm border-none outline-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                }}
                required
              />
            </div>

            <div>
              <label className="text-xs block mb-2" style={{ color: "#4A2574" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full h-12 rounded-full px-5 text-sm backdrop-blur-sm border-none outline-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                }}
                required
              />
            </div>

            <div>
              <label className="text-xs block mb-2" style={{ color: "#4A2574" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-full px-5 text-sm backdrop-blur-sm border-none outline-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                }}
                required
              />
            </div>

            <div>
              <label className="text-xs block mb-2" style={{ color: "#4A2574" }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-full px-5 text-sm backdrop-blur-sm border-none outline-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "#4A2574",
                }}
                required
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 text-center">{error}</p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full h-12 rounded-full text-sm font-medium mt-6 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #924DBF 0%, #7338A0 100%)",
                color: "white",
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <motion.button
              type="button"
              onClick={onBackToLogin}
              whileHover={{ scale: 1.05 }}
              className="text-xs font-medium transition-all"
              style={{ color: "#7338A0" }}
            >
              Already have an account?{" "}
              <span style={{ color: "#924DBF", textDecoration: "underline" }}>Login</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
