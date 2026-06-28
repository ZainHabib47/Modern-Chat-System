import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#2563EB]">

      {/* Background Blur */}
      <div className="absolute top-[-150px] left-[-150px] h-[350px] w-[350px] rounded-full bg-pink-500/30 blur-[120px]" />

      <div className="absolute bottom-[-180px] right-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-400/30 blur-[140px]" />

      <div className="absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[120px]" />

      {/* Main Container */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="w-full max-w-6xl overflow-hidden rounded-[35px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl"
        >

          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE */}

            <div className="hidden lg:flex flex-col justify-center p-14 text-white">

              <motion.h1
                initial={{ x: -40 }}
                animate={{ x: 0 }}
                transition={{ delay: .3 }}
                className="text-6xl font-black"
              >
                StaySync
              </motion.h1>

              <motion.p
                initial={{ x: -40 }}
                animate={{ x: 0 }}
                transition={{ delay: .5 }}
                className="mt-6 text-lg leading-8 text-white/80"
              >
                Connect instantly with friends.
                <br />
                Share moments.
                <br />
                Chat in real time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .8 }}
                className="mt-14"
              >

                <div className="mb-6 flex items-center gap-4">
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                  <p>Real-Time Messaging</p>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <div className="h-4 w-4 rounded-full bg-cyan-400"></div>
                  <p>Instant Friend Requests</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-4 w-4 rounded-full bg-pink-400"></div>
                  <p>Secure JWT Authentication</p>
                </div>

              </motion.div>

            </div>

            {/* RIGHT SIDE */}

            <div className="bg-white/10 p-8 lg:p-14">

              <div className="mb-10 flex rounded-full bg-white/10 p-2">

                <button
                  onClick={() => setIsLogin(true)}
                  className={`w-1/2 rounded-full py-3 font-semibold transition-all duration-300 ${
                    isLogin
                      ? "bg-white text-indigo-700 shadow-lg"
                      : "text-white"
                  }`}
                >
                  Login
                </button>

                <button
                  onClick={() => setIsLogin(false)}
                  className={`w-1/2 rounded-full py-3 font-semibold transition-all duration-300 ${
                    !isLogin
                      ? "bg-white text-indigo-700 shadow-lg"
                      : "text-white"
                  }`}
                >
                  Sign Up
                </button>

              </div>

              <AnimatePresence mode="wait">

                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ duration: .35 }}
                  >
                    <LoginForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: .35 }}
                  >
                    <SignupForm />
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Auth;