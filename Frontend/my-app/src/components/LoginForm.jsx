import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

      localStorage.setItem("token", data.token);

      setLoading(false);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Server Error");
    }
  };

  return (
    <motion.form
      onSubmit={loginUser}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl font-bold text-white">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-white/70">
          Login to continue chatting with your friends.
        </p>
      </div>

      {/* Email */}

      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

        <input
          type="email"
          placeholder="Enter your Email"
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
          placeholder="Enter your Password"
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

      {/* Forgot Password */}

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-cyan-300 hover:text-white transition"
        >
          Forgot Password?
        </button>
      </div>

      {/* Login Button */}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-4 text-lg font-semibold text-white shadow-xl transition hover:shadow-purple-500/40 disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Logging In...
          </div>
        ) : (
          "Login"
        )}
      </motion.button>

      {/* Footer */}

      <div className="pt-3 text-center text-sm text-white/60">
        Secure authentication powered by JWT
      </div>
    </motion.form>
  );
};

export default LoginForm;