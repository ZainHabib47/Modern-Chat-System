import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        alert(data.message);
        return;
      }

      setLoading(false);

      alert("🎉 Account created successfully! Please login.");

      // Clear the form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Server Error");
    }
  };

  return (
    <motion.form
      onSubmit={registerUser}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <div>
        <h2 className="text-4xl font-bold text-white">
          Create Account 🚀
        </h2>

        <p className="mt-2 text-white/70">
          Join StaySync and start chatting with your friends.
        </p>
      </div>

      {/* Username */}

      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 placeholder:text-white/50"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Email */}

      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 placeholder:text-white/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}

      <div className="relative">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-12 text-white outline-none transition-all focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 placeholder:text-white/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Confirm Password */}

      <div className="relative">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-12 text-white outline-none transition-all focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 placeholder:text-white/50"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Register Button */}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-4 text-lg font-semibold text-white shadow-xl transition hover:shadow-purple-500/40 disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </motion.button>

      <div className="pt-3 text-center text-sm text-white/60">
        Your unique StaySync number will be generated automatically.
      </div>
    </motion.form>
  );
};

export default SignupForm;